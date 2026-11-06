#!/bin/bash
set -euo pipefail

readonly JDK_URL="https://github.com/adoptium/temurin25-binaries/releases/download/jdk-25.0.5%2B8/OpenJDK25U-jdk_x64_linux_hotspot_25.0.5_8.tar.gz"
readonly JDK_SHA256="68982529869257d0ee6b824ec5aa270ff8b118bb438670da0b97ebdab178d7fb"
readonly JDK_HOME="/usr/lib/jvm/temurin-25"

readonly PAPER_URL="https://fill-data.papermc.io/v1/objects/650805b63174770b557d83bbfcdd16ec39531124b7b850589bad59bc4b6a0af8/paper-26.3-243.jar"
readonly PAPER_SHA256="650805b63174770b557d83bbfcdd16ec39531124b7b850589bad59bc4b6a0af8"
readonly PAPER_HOME="/opt/koma/paper/26.3-243"

readonly JRE_IMAGE="eclipse-temurin:25-jre@sha256:ecdc0adb37bde1a281c4d245a3cd535004b1fc8322d560f5b09463b248c81df0"

fetch_verified() {
  local url="$1" sha256="$2" destination="$3"
  curl --fail --silent --show-error --location --retry 3 --output "$destination" "$url" || return 1
  if ! echo "$sha256  $destination" | sha256sum --check --quiet; then
    rm -f "$destination"
    return 1
  fi
}

install_jdk() {
  local archive
  archive="$(mktemp)"
  fetch_verified "$JDK_URL" "$JDK_SHA256" "$archive"
  mkdir -p "$JDK_HOME"
  tar --extract --gzip --file "$archive" --directory "$JDK_HOME" --strip-components=1
  rm -f "$archive"
  ln -sfn "$JDK_HOME/bin/java" /usr/local/bin/java
  ln -sfn "$JDK_HOME/bin/javac" /usr/local/bin/javac
}

read_mojang_download_context() {
  local workdir
  workdir="$(mktemp -d)" || return 1
  (cd "$workdir" && "$JDK_HOME/bin/jar" xf "$PAPER_HOME/paper.jar" META-INF/download-context) || return 1
  cat "$workdir/META-INF/download-context" || return 1
  rm -rf "$workdir"
}

install_paper() {
  local context mojang_sha256 mojang_url mojang_name
  mkdir -p "$PAPER_HOME/cache" || return 1
  fetch_verified "$PAPER_URL" "$PAPER_SHA256" "$PAPER_HOME/paper.jar" || return 1
  context="$(read_mojang_download_context)" || return 1
  read -r mojang_sha256 mojang_url mojang_name <<<"$context" || return 1
  fetch_verified "$mojang_url" "$mojang_sha256" "$PAPER_HOME/cache/$mojang_name" || return 1
  (cd "$PAPER_HOME" && "$JDK_HOME/bin/java" -Dpaperclip.patchonly=true -jar paper.jar) || return 1
  chmod -R a+rX "$PAPER_HOME"
}

wait_for_dockerd_then_pull() {
  timeout 60 sh -c 'until docker info >/dev/null 2>&1; do sleep 1; done' || return 1
  docker pull --quiet "$JRE_IMAGE"
}

pull_jre_image() {
  local dockerd_pid pull_status=0
  dockerd >/dev/null 2>&1 &
  dockerd_pid=$!
  wait_for_dockerd_then_pull || pull_status=$?
  kill "$dockerd_pid"
  wait "$dockerd_pid" || true
  return "$pull_status"
}

warn_on_failure() {
  local step="$1"
  if ! "$step"; then
    echo "cloud-setup: $step failed; server tests will fail until the environment is fixed" >&2
  fi
}

install_jdk
warn_on_failure install_paper &
warn_on_failure pull_jre_image &
wait

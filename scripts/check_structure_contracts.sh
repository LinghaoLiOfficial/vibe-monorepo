#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

FRONTEND_REQUIRED=(
  "frontend/src/app"
  "frontend/src/lib"
  "frontend/src/styles"
)

BACKEND_REQUIRED=(
  "backend/app/api"
  "backend/app/application"
  "backend/app/domain"
  "backend/app/infrastructure"
  "backend/app/core"
  "backend/app/schemas"
  "backend/alembic"
  "backend/tests"
)

check_paths() {
  local label="$1"
  shift
  local missing=0

  for path in "$@"; do
    if [[ ! -d "$ROOT/$path" ]]; then
      echo "[MISSING] $label: $path"
      missing=1
    else
      echo "[OK] $label: $path"
    fi
  done

  return "$missing"
}

check_paths "frontend" "${FRONTEND_REQUIRED[@]}"
frontend_ok=$?
check_paths "backend" "${BACKEND_REQUIRED[@]}"
backend_ok=$?

if [[ $frontend_ok -ne 0 || $backend_ok -ne 0 ]]; then
  echo "Structure contract check failed."
  exit 1
fi

echo "Structure contract check passed."

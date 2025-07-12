#!/usr/bin/env bash
set -euo pipefail

# WORK_DIR="$(cd "$(dirname "$0")/.." && pwd)"
# cd "$WORK_DIR"

echo "[INFO] : クリーンアップ中..."
rm -rf .next out
echo "[OK]   : .next, out 削除完了"
sleep 1

echo "[INFO] : ビルド中..."
npm run build
echo "[OK]   : ビルド完了"
sleep 1

echo "[INFO] : 静的ファイルを起動中（http://localhost:3040）..."
#npx serve out --single
npm run preview

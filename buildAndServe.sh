#!/usr/bin/env bash
set -euo pipefail

trap 'echo "[INFO] : 強制終了"; exit 1' INT

echo "[INFO] : クリーンアップ中..."
rm -rf .next
echo "[OK]   : .next 削除完了"
sleep 1

echo "[INFO] : ビルド中..."
npm run build
echo "[OK]   : ビルド完了"
sleep 1

echo "[INFO] : サーバーを起動中（http://localhost:3040）..."
npm run start

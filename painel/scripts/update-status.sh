#!/usr/bin/env bash
# ============================================================
# update-status.sh — Konnex Ideas Panel
# Atualiza status de um projeto pelo nome
#
# Uso:
#   bash painel/scripts/update-status.sh \
#     --name "Nome do Projeto" --status "concluido"
# ============================================================
set -e

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
JSON_FILE="$ROOT_DIR/painel/projects.json"
TODAY=$(date +%Y-%m-%d)

NAME="" STATUS=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --name)   NAME="$2";   shift 2 ;;
    --status) STATUS="$2"; shift 2 ;;
    *) echo "Parametro desconhecido: $1"; exit 1 ;;
  esac
done

[[ -z "$NAME" || -z "$STATUS" ]] && { echo "Uso: $0 --name \"Nome\" --status \"concluido\""; exit 1; }

python3 - <<PYEOF
import json, sys

with open('$JSON_FILE') as f:
    data = json.load(f)

found = False
for p in data['projects']:
    if p['name'].lower() == '$NAME'.lower():
        p['status']     = '$STATUS'
        p['updated_at'] = '$TODAY'
        found = True
        print(f"Atualizado: {p['name']} -> $STATUS")

if not found:
    print("Erro: projeto nao encontrado.", file=sys.stderr)
    sys.exit(1)

with open('$JSON_FILE', 'w') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
PYEOF

cd "$ROOT_DIR"
git add painel/projects.json
git commit -m "chore(painel): update \"$NAME\" status to \"$STATUS\""
git remote get-url origin > /dev/null 2>&1 && git push && echo "Push realizado." || true

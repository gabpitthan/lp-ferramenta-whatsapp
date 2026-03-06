#!/usr/bin/env bash
# ============================================================
# add-project.sh — Konnex Ideas Panel
# Adiciona um projeto ao painel e faz auto-commit/push
#
# Uso:
#   bash painel/scripts/add-project.sh \
#     --name "Nome" \
#     --desc "Descricao" \
#     --status "em-andamento" \
#     --category "categoria" \
#     --url "https://..." \
#     --repo "https://github.com/..."
#
# Status validos: em-andamento | concluido | ideia | pausado
# Categorias:     landing-page | docs | legal | infra |
#                 conteudo | automacao | dashboard | api | ia | geral
# ============================================================
set -e

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
JSON_FILE="$ROOT_DIR/painel/projects.json"
TODAY=$(date +%Y-%m-%d)

NAME="" DESC="" STATUS="ideia" CATEGORY="geral" URL="" REPO=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --name)     NAME="$2";     shift 2 ;;
    --desc)     DESC="$2";     shift 2 ;;
    --status)   STATUS="$2";   shift 2 ;;
    --category) CATEGORY="$2"; shift 2 ;;
    --url)      URL="$2";      shift 2 ;;
    --repo)     REPO="$2";     shift 2 ;;
    *) echo "Parametro desconhecido: $1"; exit 1 ;;
  esac
done

if [[ -z "$NAME" || -z "$DESC" ]]; then
  echo "Erro: --name e --desc sao obrigatorios"
  exit 1
fi

ID=$(date +%s)

python3 - <<PYEOF
import json

with open('$JSON_FILE', 'r') as f:
    data = json.load(f)

data['projects'].append({
    "id":         "$ID",
    "name":       "$NAME",
    "description":"$DESC",
    "status":     "$STATUS",
    "category":   "$CATEGORY",
    "url":        "$URL",
    "repo":       "$REPO",
    "created_at": "$TODAY",
    "updated_at": "$TODAY"
})

with open('$JSON_FILE', 'w') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'Adicionado: $NAME')
PYEOF

cd "$ROOT_DIR"
git add painel/projects.json
git commit -m "feat(painel): add project \"$NAME\""

if git remote get-url origin > /dev/null 2>&1; then
  git push
  echo "Push realizado — Netlify fara o deploy automaticamente."
else
  echo "Aviso: configure o remote com: git remote add origin <url>"
fi

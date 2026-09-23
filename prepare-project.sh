#!/usr/bin/env bash

set -e

# Directory containing this script = project root
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
PROJECT_NAME="$(basename "$PROJECT_ROOT")"

# Project name may contain letters, numbers, dashes, and underscores
if [[ ! "$PROJECT_NAME" =~ ^[a-zA-Z0-9_-]+$ ]]; then
    echo "Error: project name '$PROJECT_NAME' can only contain letters, numbers, dashes, and underscores."
    exit 1
fi

# Check jq
if ! command -v jq >/dev/null 2>&1; then
    echo "Error: jq is required. Install it with: brew install jq"
    exit 1
fi

echo "Project root: $PROJECT_ROOT"
echo "Project name: $PROJECT_NAME"
echo

find "$PROJECT_ROOT" \
    -type f \
    -name "package.json" \
    -not -path "*/node_modules/*" \
    -print0 |
while IFS= read -r -d '' file; do

    echo "Updating: $file"

    tmp="$(mktemp)"

    jq --arg namespace "@$PROJECT_NAME" '
        if (.name | type) == "string" and (.name | startswith("@template/")) then
            .name = (.name | sub("^@template/"; "\($namespace)/"))
        else
            .
        end
    ' "$file" > "$tmp"

    mv "$tmp" "$file"
done

echo
echo "Done."
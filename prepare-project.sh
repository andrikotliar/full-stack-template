#!/usr/bin/env bash

set -euo pipefail

# The directory where this script lives is the project root.
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
PROJECT_NAME="$(basename "$PROJECT_ROOT")"
NAMESPACE="@${PROJECT_NAME}"

# Project name may contain letters, numbers, dashes, and underscores.
if [[ ! "$PROJECT_NAME" =~ ^[a-zA-Z0-9_-]+$ ]]; then
    echo "Error: project name '$PROJECT_NAME' can only contain letters, numbers, dashes, and underscores." >&2
    exit 1
fi

# jq is required.
if ! command -v jq >/dev/null 2>&1; then
    echo "Error: jq is required. Install it with: brew install jq" >&2
    exit 1
fi

echo "Project root: $PROJECT_ROOT"
echo "Namespace:    $NAMESPACE"
echo

find "$PROJECT_ROOT" \
    -type f \
    -name "package.json" \
    -not -path "*/node_modules/*" \
    -print0 |
while IFS= read -r -d '' file; do

    echo "Processing: $file"

    tmp="$(mktemp)"

    jq --arg namespace "$NAMESPACE" '
        if (.name? | type) == "string" then
            .name |= sub("^@[^/]+"; $namespace)
        else
            .
        end
    ' "$file" > "$tmp"

    mv "$tmp" "$file"
done

echo
echo "Done."
```bash
#!/usr/bin/env bash

set -euo pipefail

# Get the current project root directory name.
PROJECT_ROOT="$(basename "$(pwd)")"

# Only letters and dashes are allowed.
if [[ ! "$PROJECT_ROOT" =~ ^[a-zA-Z-]+$ ]]; then
  echo "Error: project root name '$PROJECT_ROOT' contains characters other than letters and dashes."
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "Error: jq is required but was not found."
  exit 1
fi

echo "Using project name: @$PROJECT_ROOT"

find . -type f -name "package.json" -not -path "*/node_modules/*" -print0 |
while IFS= read -r -d '' file; do
  echo "Updating: $file"

  tmp="$(mktemp)"

  jq --arg namespace "@$PROJECT_ROOT" '
    if (.name | type) == "string" and (.name | startswith("@template/")) then
      .name = (.name | sub("^@template/"; "\($namespace)/"))
    else
      .
    end
  ' "$file" > "$tmp"

  mv "$tmp" "$file"
done

echo "Done."
```

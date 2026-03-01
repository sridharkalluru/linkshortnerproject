#!/bin/bash

TOOL_NAME=$(node -e "const d=require('fs').readFileSync(0,'utf8'); try { console.log(JSON.parse(d).toolName); } catch(e) { process.exit(0); }")

if [[ "$TOOL_NAME" == "create" || "$TOOL_NAME" == "edit" ]]; then
  npx prettier --write .
fi

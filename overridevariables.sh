CURRENT_WORKFLOW=$1

# Wipe variables that shouldn't export from workflows
# See https://www.alfredforum.com/topic/9873-how-to-package-a-workflow-via-the-command-line/
TEMP_WORKFLOW="$(mktemp -d)"
cp -R "${CURRENT_WORKFLOW}/"* "${TEMP_WORKFLOW}"
TEMP_PLIST="${TEMP_WORKFLOW}/info.plist"
/usr/libexec/PlistBuddy -c 'Print variablesdontexport' "${TEMP_PLIST}" | grep '    ' | sed -E 's/ {4}//' | xargs -I {} /usr/libexec/PlistBuddy -c "Set variables:'{}' ''" "${TEMP_PLIST}"
echo "$TEMP_WORKFLOW"
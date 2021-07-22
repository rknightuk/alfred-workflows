CURRENT=$(pwd)

cd ..
WF_DIR=$(pwd)
ENABLED="false"

for WF_DIR in */; do
	PLIST="$WF_DIR""info.plist"

	# Don't export disabled workflows
	DISABLED=$(/usr/libexec/PlistBuddy -c "Print :disabled" $PLIST)
	if [[ $DISABLED = true ]]; then
		continue
	fi

	if grep -q "$BUNDLE_PREFIX" "$PLIST"; then
		CURRENT_WORKFLOW="${WORKFLOW_PATH}/${WF_DIR}"
    	BUNDLEID=$(/usr/libexec/PlistBuddy -c "Print :bundleid" $PLIST)
    	echo "$BUNDLEID" > /dev/stderr
    	if [ "$BUNDLEID" = "com.rknightuk.calendar-events" ]; then
    		ENABLED="true"
    		break
		fi
    fi
done

cd $CURRENT
osascript ./scripts/init.js "$ENABLED"
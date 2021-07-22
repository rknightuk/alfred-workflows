# The directory to backup your workflows
BACKUP_PATH="/Users/robb/Sites/personal/alfred-workflows"

# The directory where your Alfred workflows live
WORKFLOW_PATH="/Users/robb/Dropbox/Alfred/Alfred.alfredpreferences/workflows"

# The bundle prefix you use for your workflows
BUNDLE_PREFIX="com.rknightuk"

# The Github repository
GITHUB_REPO="rknightuk/alfred-workflows"
GITHUB_DOWNLOAD="https://github.com/${GITHUB_REPO}/raw/main"

# Copy the example readme into the backup readme file
README_FILE=$BACKUP_PATH/readme.md
cp ./readme.example $README_FILE

# Navigate to the workflow directory
cd $WORKFLOW_PATH

MINE=""
OTHERS=""

for WF_DIR in */; do
	PLIST="$WF_DIR""info.plist"
	NAME=$(/usr/libexec/PlistBuddy -c "Print :name" $PLIST)
	NAME=${NAME/$NAME_REPLACE/''}

	# Don't export disabled workflows
	DISABLED=$(/usr/libexec/PlistBuddy -c "Print :disabled" $PLIST)
	if [[ $DISABLED = true ]]; then
		continue
	fi

	if grep -q "$BUNDLE_PREFIX" "$PLIST"; then
		CURRENT_WORKFLOW="${WORKFLOW_PATH}/${WF_DIR}"
    	BUNDLEID=$(/usr/libexec/PlistBuddy -c "Print :bundleid" $PLIST)
    	BUNDLEID=${BUNDLEID/$BUNDLE_PREFIX./''}
    	VERSION=$(/usr/libexec/PlistBuddy -c "Print :version" $PLIST)
    	DESC=$(/usr/libexec/PlistBuddy -c "Print :description" $PLIST)
    	if [ ! -z "$DESC" ]
		then
		    DESC="_$DESC"_
	    else
	    	DESC=""
		fi

    	# Wipe variables that shouldn't export from workflows
    	# See https://www.alfredforum.com/topic/9873-how-to-package-a-workflow-via-the-command-line/
    	if /usr/libexec/PlistBuddy -c 'Print :variablesdontexport' "$PLIST" &> /dev/null; then
    		TEMP_WORKFLOW="$(mktemp -d)"
    		cp -R "${CURRENT_WORKFLOW}/"* "${TEMP_WORKFLOW}"
    		TEMP_PLIST="${TEMP_WORKFLOW}/info.plist"
    		/usr/libexec/PlistBuddy -c 'Print variablesdontexport' "${TEMP_PLIST}" | grep '    ' | sed -E 's/ {4}//' | xargs -I {} /usr/libexec/PlistBuddy -c "Set variables:'{}' ''" "${TEMP_PLIST}"
    		CURRENT_WORKFLOW=$TEMP_WORKFLOW
    	fi

	    COPY_PATH="${BACKUP_PATH}/workflows/${BUNDLEID}/${BUNDLEID}.alfredworkflow"
	    LINK="https://raw.githubusercontent.com/rknightuk/alfred-workflows/putSourceOnGithub/workflows/${BUNDLEID}/src/screenshot.png"
	    cp -r $CURRENT_WORKFLOW "${BACKUP_PATH}/workflows/${BUNDLEID}/src"

    	ditto -ck "${CURRENT_WORKFLOW}" "$COPY_PATH"
    	MINE="${MINE}### $NAME\n\n$DESC [Download v${VERSION}]($LINK) \n\n"
    	if test -f "$WF_DIR/readme.md"; then
    		cp "$WF_DIR/readme.md" "${BACKUP_PATH}/workflows/${BUNDLEID}/readme.md"
		fi
		if test -f "${BACKUP_PATH}/workflows/${BUNDLEID}/src/screenshot.png"; then
    		MINE="${MINE} ![$BUNDLEID screenshot](screenshots/$BUNDLEID.png)\n\n"
		fi
		if test -f "$WF_DIR/changelog.md"; then
			CL=$(cat "$WF_DIR/changelog.md")
			MINE="${MINE} #### Changelog \n\n"${CL//$'\n'/'\n'}"\n\n"
		fi	

	else
		AUTHOR=$(/usr/libexec/PlistBuddy -c "Print :createdby" $PLIST)
		WEBSITE=$(/usr/libexec/PlistBuddy -c "Print :webaddress" $PLIST)
		if [[ $AUTHOR = "" ]]; then
			continue
		fi
		if [[ $WEBSITE = "" ]]; then
			OTHERS="${OTHERS}- $NAME by $AUTHOR \n"
		else
			OTHERS="${OTHERS}- [$NAME by $AUTHOR]($WEBSITE) \n"
		fi
    fi
done

echo -e $MINE >> $README_FILE
echo -e "## Third Party Workflows\n" >> $README_FILE
echo -e $OTHERS >> $README_FILE
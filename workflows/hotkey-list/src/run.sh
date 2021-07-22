KEYCODE=$1
MODIFIERS=$2

TEMP="$(mktemp -d)"
cd $TEMP

MODSTRING="using {$MODIFIERS}"

if [ -z "$MODIFIERS" ]; then
	MODSTRING=""
fi

SCPT="tell application \"System Events\"
	key code $KEYCODE $MODSTRING
end tell"

touch "foo.scpt"

echo "$SCPT" >> "foo.scpt"

osascript "$TEMP/foo.scpt"
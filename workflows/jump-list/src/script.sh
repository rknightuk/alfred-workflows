MARKS_DIR=~/.marks
cd $MARKS_DIR
LIST=""
JSON='{"items": [ '
for JUMP in */; do
	cd $JUMP
	PATH=$(pwd -P)
	LIST="$LIST\"$PATH\","
	SHORTPATH=${PATH:12}
	NAME=${JUMP/\//''}
	JSON="$JSON { \"uid\": \"$PATH\", \"title\": \"$NAME - $SHORTPATH\", \"arg\": \"$PATH\", \"autocomplete\": \"$NAME\" },"
	cd ..
done

JSON="$JSON ]}"

FIRST=", ]}"
SECOND="]}"
JSON="${JSON/$FIRST/$SECOND}"

echo $JSON

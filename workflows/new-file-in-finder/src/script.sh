DIR=$1

FILE_WITH_PATH="$DIR$new_file"

if [ -z "$DIR" ]; then
	DIR=~"~/Downloads"
fi

if test -f "$FILE_WITH_PATH"; then
    echo "$new_file aleady exists"
else
	touch "$FILE_WITH_PATH"
	echo "$new_file created in $DIR"
fi
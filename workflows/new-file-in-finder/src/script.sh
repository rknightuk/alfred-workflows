DIR=$1

if [ -z "$DIR" ]; then
	DIR=~"/Desktop/"
fi

FILE_WITH_PATH="$DIR$new_file"

if test -f "$FILE_WITH_PATH"; then
    echo "$new_file aleady exists"
else
	eval "touch $FILE_WITH_PATH"
	echo "$new_file created in $DIR"
fi

eval "open $DIR"
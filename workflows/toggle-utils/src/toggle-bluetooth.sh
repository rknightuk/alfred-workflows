STATUS=$(/usr/local/bin/blueutil -p)

if [ "$STATUS" = 1 ]
then
    NEW_STATUS=0
else
	NEW_STATUS=1
fi

/usr/local/bin/blueutil -p $NEW_STATUS
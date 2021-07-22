DATE=$1
TEXT=$2
LIST=$3

DATE_ARG="--due-date \"$DATE\""

if [ -z "$DATE" ]
then
	DATE_ARG=""
fi

eval "./reminders-helper add \"$LIST\" \"$TEXT\" $DATE_ARG" 
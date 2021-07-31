DATE=$1
TEXT=$2
LIST=$3

DATE_ARG="--due-date \"$DATE\""

if [ -z "$DATE" ]
then
	DATE_ARG=""
fi

echo "./agendas add-reminder \"$LIST\" \"$TEXT\" $DATE_ARG" > /dev/stderr

eval "./agendas add-reminder \"$LIST\" \"$TEXT\" $DATE_ARG" 
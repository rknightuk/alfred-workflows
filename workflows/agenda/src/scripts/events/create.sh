START=$1
END=$2
TITLE=$3
LIST=$4
LOCATION=$5

END_ARG="-e \"$END\""

if [ -z "$END" ]
then
	END_ARG=""
fi

LOCATION_ARG="-l \"$LOCATION\""

if [ -z "$LOCATION" ]
then
	LOCATION_ARG=""
fi

eval "./agendas add-event \"$LIST\" \"$TITLE\" -s \"$START\" $END_ARG $LOCATION_ARG"
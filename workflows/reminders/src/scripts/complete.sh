LIST_NAME=$1
INDEX=$2
ANYTIME=$3

if [ -z "$LIST_NAME" ]
then
    LIST_NAME="RMindAllReminders"
fi

DATA=$INDEX
if [ ! -z "$ANYTIME" ]
then
    DATA=$DATA $ANYTIME
fi

./reminders-helper complete "$LIST_NAME" $INDEX $ANYTIME
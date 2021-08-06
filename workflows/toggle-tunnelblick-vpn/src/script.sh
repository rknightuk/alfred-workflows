VPN_NAME=$1

NAME="$VPN_NAME VPN: "
STATUS_TEXT="Connecting..."
ICON_PATH="icons/connecting.png"

if [ "$VPN_NAME" = "" ]
then
    echo "{ \"items\": [{ \"title\": \"No VPN found\", \"subtitle\": \"Select to set VPN name\", \"arg\": \"SET_VPN\", \"icon\": { \"path\": \"icons/disconnected.png\" } }]}"
    exit 1
fi

STATUS=$(osascript -e "tell application \"Tunnelblick\"" -e "get state of first configuration where name = \"$VPN_NAME\"" -e "end tell")

if [ "$STATUS" = "CONNECTED" ]; then
    STATUS_TEXT="Connected"
    ICON_PATH="icons/connected.png"
fi
if [ "$STATUS" = "EXITING" ]; then
    STATUS_TEXT="Disconnected"
    ICON_PATH="icons/disconnected.png"
fi

echo "{ \"items\": [{ \"title\": \"$VPN_NAME VPN Status\", \"subtitle\": \"$STATUS_TEXT\",  \"arg\": \"$KEY\", \"icon\": { \"path\": \"$ICON_PATH\" } }]}"
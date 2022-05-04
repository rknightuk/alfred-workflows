source=$(/usr/local/bin/SwitchAudioSource -c)
if [ "$source" = "USB Audio Device" ];
then
  osascript -e 'tell app "Music" to pause'
  /usr/local/bin/SwitchAudioSource -s "MacBook Pro Speakers"
  osascript -e "set Volume 5"
else
  osascript -e "set Volume 2"
  /usr/local/bin/SwitchAudioSource -s "USB Audio Device"
fi

/usr/local/bin/SwitchAudioSource -c
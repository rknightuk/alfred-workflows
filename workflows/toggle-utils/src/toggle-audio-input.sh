source=$(/opt/homebrew/bin/SwitchAudioSource -c)
if [ "$source" = "USB Audio Device" ];
then
  osascript -e 'tell app "Music" to pause'
  /opt/homebrew/bin/SwitchAudioSource -s "MacBook Pro Speakers"
  osascript -e "set Volume 5"
else
  osascript -e "set Volume 2"
  /opt/homebrew/bin/SwitchAudioSource -s "USB Audio Device"
fi

/opt/homebrew/bin/SwitchAudioSource -c
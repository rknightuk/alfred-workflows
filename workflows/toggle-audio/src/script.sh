source=$(/usr/local/bin/SwitchAudioSource -c)
if [ "$source" = "DELL U2419H" ];
then
  osascript -e 'tell app "Music" to pause'
  /usr/local/bin/SwitchAudioSource -s "MacBook Pro Speakers"
  osascript -e "set Volume 5"
else
  osascript -e "set Volume 2"
  /usr/local/bin/SwitchAudioSource -s "DELL U2419H"
fi

/usr/local/bin/SwitchAudioSource -c
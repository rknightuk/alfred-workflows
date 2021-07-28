TYPE=$1

if [ "$TYPE" = 'work' ]; then
	/usr/local/bin/SwitchAudioSource -s "DELL U2419H"
	/usr/local/bin/SwitchAudioSource -s "MacBook Pro Microphone" -t "input"
	exit
fi

if [ "$TYPE" = 'home' ]; then
	/usr/local/bin/SwitchAudioSource -s "MacBook Pro Speakers"
	/usr/local/bin/SwitchAudioSource -s "MacBook Pro Microphone" -t "input"
	exit
fi

if [ "$TYPE" = 'podcast' ]; then
	/usr/local/bin/SwitchAudioSource -s "Yeti Stereo Microphone"
	/usr/local/bin/SwitchAudioSource -s "Yeti Stereo Microphone" -t "input"
  	exit
fi
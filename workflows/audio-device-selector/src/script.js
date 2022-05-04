function formatData(title) {
	const names = {
		'DELL U2419H': {
			name: 'Headphones',
			icon: 'headphones.png'
		},
		'USB Audio Device': {
			name: 'Speakers',
			icon: 'speaker.png',
		},
		'MacBook Pro Speakers': {
			name: 'Vision',
			icon: 'laptop.png'
		},
		'MacBook Pro Microphone': {
			name: 'Vision',
			icon: 'laptop.png'
		}
	}

	return names[title] ?? { name: title, icon: null }

	if (Object.keys(names).includes(title)) {
		return names[title]
	}

	return title
}

function run(argv) {
	const type = argv[0]

	var app = Application.currentApplication();
	app.includeStandardAdditions = true;
	
	devices = app.doShellScript(`/usr/local/bin/SwitchAudioSource -a -t ${type}`);

	items = devices.split('\r').map(d => {
		const data = formatData(d)
	    return {
	    	title: data.name,
	    	arg: `-s "${d}" -t ${type}`,
	    	autocomplete: d,
	    	icon: {
	    		path: data.icon ?? null,
	    	}
	    }
	})

	return JSON.stringify({ items: items })
}
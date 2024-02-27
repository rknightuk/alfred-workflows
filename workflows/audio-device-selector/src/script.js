function formatData(title) {
	const names = {
		'DELL U2715H': {
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
		},
		'Razer Seiren Mini': {
			name: 'Microphone',
			icon: 'mic.png'
		}
	}

	return names[title] ?? { name: title, icon: null }
}

function run(argv) {
	const type = argv[0]
	ObjC.import('stdlib');
	const execPath = $.getenv('exec_path') ?? '/opt/homebrew/bin/SwitchAudioSource'

	var app = Application.currentApplication();
	app.includeStandardAdditions = true;
	
	devices = app.doShellScript(`${execPath} -a -t ${type}`);

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
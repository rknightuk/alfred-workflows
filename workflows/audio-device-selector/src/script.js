function run(argv) {
	const type = argv[0]

	var app = Application.currentApplication();
	app.includeStandardAdditions = true;
	
	devices = app.doShellScript(`/usr/local/bin/SwitchAudioSource -a -t ${type}`);

	items = devices.split('\r').map(d => {
	    return {
	    	title: d,
	    	arg: `-s "${d}" -t ${type}`,
	    	autocomplete: d,
	    }
	})

	return JSON.stringify({ items: items })
}
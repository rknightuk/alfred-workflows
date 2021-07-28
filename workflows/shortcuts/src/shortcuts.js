function run(argv) {
	var app = Application.currentApplication();
	app.includeStandardAdditions = true;
	shortcuts = app.doShellScript('shortcuts list');

	items = shortcuts.split('\r').map(sc => {
	    return {
	    	title: sc,
	    	arg: sc,
	    	autocomplete: sc,
	   	 	icon: {}, // todo
	   	 	mods: {
	   	 		cmd: {
	   	 			arg: sc,
	   	 			subtitle: `View ${sc} in Shortcuts`,
	   	 		}
	   	 	}
	    }
	})

	return JSON.stringify({ items: items })
}
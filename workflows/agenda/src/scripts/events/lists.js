function run(argv) {
	var app = Application.currentApplication();
	app.includeStandardAdditions = true;
	lists = app.doShellScript('./agendas calendars;');

	items = lists.split('\r').map(l => {
	    return {
	    	title: l,
	    	arg: l,
	    	autocomplete: l,
	    	icon: {
	    		path: 'icons/list.png',
	    	}
	    }
	})

	return JSON.stringify({ items: items })
}
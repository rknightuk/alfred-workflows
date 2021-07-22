function run(argv) {
	var app = Application.currentApplication();
	app.includeStandardAdditions = true;
	lists = app.doShellScript('./reminders-helper show-lists;');

	items = lists.split('\r').map(l => {
	    return {
	    	title: l,
	    	arg: l,
	    	autocomplete: l,
	    }
	})

	return JSON.stringify({ items: items })
}
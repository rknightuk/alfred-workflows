function run(argv) {
	var app = Application.currentApplication();
	app.includeStandardAdditions = true;
	const listName = argv

	reminders = app.doShellScript(`./reminders-helper anytime "${listName}"`);

	const data = reminders === '' ? [] : reminders.split('\r')

	items = data.map(r => {
		icon = 'icons/check.png'
	    const parsed = JSON.parse(r)

	    return {
	    	title: parsed.title,
	    	arg: parsed.id,
	    	autocomplete: parsed.title,
	    	mods: {
	    		alt: {
	    			arg: `open x-apple-reminderkit://REMCDReminder/${parsed.uuid}`,
	    			subtitle: 'Open Reminder'
	    		}
	    	}
	    }
	})

	if (reminders === '')
	{
		items = [
			{
				title: "No any time reminders",
				arg: 'NOOP',
			}
		]
	}

	return JSON.stringify({ items: items })
}
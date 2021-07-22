function run(argv) {
	var app = Application.currentApplication();
	app.includeStandardAdditions = true;
	const listName = argv
	const hasListName = listName != ''
	if (hasListName)
	{
		reminders = app.doShellScript(`./reminders-helper show "${listName}"`);
	} else {
		reminders = app.doShellScript('./reminders-helper upcoming')
	}

	let icon = 'icons/check.png'

	const data = reminders === '' ? [] : reminders.split('\r')

	items = data.map(r => {
		icon = 'icons/check.png'
	    const parsed = JSON.parse(r)
	    
	    const todayTS = new Date()
	    const todayDate = todayTS.getDate() < 10 ? `0${todayTS.getDate()}` : todayTS.getDate();
	    const todayMonth = (todayTS.getMonth() + 1) < 10 ? `0${(todayTS.getMonth() + 1)}` : todayTS.getMonth() + 1;
	    const todayDateString = `${todayTS.getFullYear()}-${todayMonth}-${todayDate}`

	    const tomorrowTS = new Date()
	    tomorrowTS.setDate(tomorrowTS.getDate() + 1)
	    const tomorrowDate = tomorrowTS.getDate() < 10 ? `0${tomorrowTS.getDate()}` : tomorrowTS.getDate();
	    const tomorrowMonth = (tomorrowTS.getMonth() + 1) < 10 ? `0${(tomorrowTS.getMonth() + 1)}` : tomorrowTS.getMonth() + 1;
	    const tomorrowDateString = `${tomorrowTS.getFullYear()}-${tomorrowMonth}-${tomorrowDate}`

	    const reminderTS = new Date(parsed.date.replace(' ', 'T'))
	    const isOverdue = reminderTS < todayTS
	    const isToday = parsed.date.includes(todayDateString)
	    const isTomorrow = parsed.date.includes(tomorrowDateString)

	    let date = parsed.date
	    if (isToday)
	    {
			date = parsed.date.replace(todayDateString, 'Today at')
			icon = 'icons/today.png'
	    } else if (isTomorrow)
	    {
	    	date = parsed.date.replace(tomorrowDateString, 'Tomorrow at')
	    }
	    if (isOverdue)
	    {
	    	date = 'Overdue - ' + date
	    	icon = 'icons/alert.png'
	    }

	    return {
	    	title: parsed.title,
	    	arg: parsed.id,
	    	subtitle: `${date} ${hasListName ? '' : `/ ${parsed.list}`}`,
	    	autocomplete: parsed.title,
	    	icon: {
	    		path: icon,
	    	}
	    }
	})

	if (hasListName)
	{
		const anytimeTitle = `Show any time reminders in ${listName}`
		items.unshift({
			title: anytimeTitle,
			arg: `ANYTIME:${listName}`,
			autocomplete: anytimeTitle,
		})

		const createTitle = `Create New Reminder in ${listName}`
		items.unshift({
			title: createTitle,
			arg: `CREATE:${listName}`,
			autocomplete: createTitle,
			icon: {
				path: 'icons/add.png',
			}
		})
	}

	return JSON.stringify({ items: items })
}
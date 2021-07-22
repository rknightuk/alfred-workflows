function run(argv) {
	var app = Application.currentApplication();
	app.includeStandardAdditions = true;
	const listName = argv
	const hasListName = listName != ''
	if (hasListName)
	{
		reminders = app.doShellScript(`./calendars-helper events "${listName}"`);
	} else {
		reminders = app.doShellScript('./calendars-helper events')
	}

	const data = reminders === '' ? [] : reminders.split('\r')

	items = data.map(r => {
		icon = 'icons/check.png'
	    const parsed = JSON.parse(r)
	    
	    let startDate = parsed.start
	    let endDate = parsed.end

	    const todayTS = new Date()
	    const todayDate = todayTS.getDate() < 10 ? `0${todayTS.getDate()}` : todayTS.getDate();
	    const todayMonth = (todayTS.getMonth() + 1) < 10 ? `0${(todayTS.getMonth() + 1)}` : todayTS.getMonth() + 1;
	    const todayDateString = `${todayTS.getFullYear()}-${todayMonth}-${todayDate}`

	    const tomorrowTS = new Date()
	    tomorrowTS.setDate(tomorrowTS.getDate() + 1)
	    const tomorrowDate = tomorrowTS.getDate() < 10 ? `0${tomorrowTS.getDate()}` : tomorrowTS.getDate();
	    const tomorrowMonth = (tomorrowTS.getMonth() + 1) < 10 ? `0${(tomorrowTS.getMonth() + 1)}` : tomorrowTS.getMonth() + 1;
	    const tomorrowDateString = `${tomorrowTS.getFullYear()}-${tomorrowMonth}-${tomorrowDate}`

	    const eventTS = new Date(parsed.start.replace(' ', 'T'))
	    const isOverdue = eventTS < todayTS
	    const isToday = parsed.start.includes(todayDateString)
	    const isTomorrow = parsed.start.includes(tomorrowDateString)

	    const [eventStartDate, eventStartTime] = startDate.split(' ')
	    const [eventEndDate, eventEndTime] = endDate.split(' ')
	    
	    const isAllDay = parsed.allDay === 'true'
	    const isSameDay = !isAllDay && eventStartDate === eventEndDate

	    if (isToday)
	    {
			startDate = parsed.start.replace(todayDateString, 'Today at')
			icon = 'icons/today.png'
	    } else if (isTomorrow)
	    {
	    	startDate = parsed.start.replace(tomorrowDateString, 'Tomorrow at')
	    }

	    startDate = startDate.replace(' at 00:00', '')

	    let subtitle = `${startDate}`
	    if (isAllDay) {
	    	subtitle = 'All day'
	    	if (isToday) {
	    		subtitle += ' today'
	    	} else if (isTomorrow) {
				subtitle += ' tomorrow'
	    	} else {
	    		subtitle = `${eventStartDate} all day`
	    	}
	    } else if (isSameDay && isToday) {
	    	subtitle += ` until ${eventEndTime}`
	    } else if (isSameDay && isTomorrow)
	    {
	    	subtitle += ` - ${eventEndTime}`
	    	subtitle = subtitle.replace('Tomorrow at', 'Tomorrow')
	    } else if (!isSameDay) {
	    	subtitle += ` - ${eventEndDate} ${eventEndTime}`
	    } else {
	    	subtitle += ` - ${eventEndTime}`
	    }

	    if (parsed.location)
	    {
	    	subtitle += ` @ ${parsed.location}`
	    }

	    let option = {
	    	title: parsed.title,
	    	arg: eventStartDate,
	    	subtitle: subtitle,
	    	autocomplete: parsed.title,
	    }

	    const titleLC = parsed.title.toLowerCase()
	    if (titleLC.includes('birthday'))
	    {
	    	option.icon = {
	    		path: "icons/gift.png"
	    	}
	    }

	    return option
	})

	if (hasListName)
	{
		const createTitle = `Create New Event in ${listName}`
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
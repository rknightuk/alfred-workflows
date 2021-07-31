function run(argv) {
	const remindersEnabled = argv[0] === 'true'
	const calendarsEnabled = argv[1] === 'true'

	const items = []

	if (remindersEnabled || calendarsEnabled)
	{
		items.push({
			title: 'Today Overview',
			arg: 'today',
			uid: 'today',
			icon: {
				path: 'icons/overview.png',
			},
			variables: {
				todayOnly: true,
			}
		})
		
		items.push({
			title: 'Upcoming',
			arg: 'upcoming',
			uid: 'upcoming',
			icon: {
				path: 'icons/overview.png',
			},
			variables: {
				todayOnly: false,
			}
		})
	}

	if (remindersEnabled)
	{		
		items.push({
			title: 'Reminder Lists',
			arg: 'reminder_lists',
			uid: 'reminder_lists',
			icon: {
				path: 'icons/list.png',
			}
		})

		items.push({
			title: 'Create New Reminder',
			arg: 'reminder_create',
			uid: 'reminder_create',
			icon: {
				path: 'icons/add.png',
			}
		})
	}

	if (calendarsEnabled)
	{
		items.push({
			title: 'Calendars',
			arg: 'calendar_lists',
			uid: 'calendar_lists',
			icon: {
				path: 'icons/calendar.png',
			}
		})

		items.push({
			title: 'Create New Event',
			arg: 'calendar_create',
			uid: 'calendar_create',
			icon: {
				path: 'icons/add.png',
			}
		})
	}

	items.push({
		title: 'Manage Settings',
		arg: 'settings',
		uid: 'settings',
		icon: {
			path: 'icons/settings.png',
		}
	})

	return JSON.stringify({ items })

}
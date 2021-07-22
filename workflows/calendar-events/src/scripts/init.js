function run(argv) {
	const hasReminders = argv[0] === 'true'

	const items = [
		{
			title: 'Upcoming Events',
			arg: 'upcoming',
			icon: {
				path: 'icons/calendar.png',
			},
		},
		{
			title: 'Calendars',
			arg: 'lists',
			icon: {
				path: 'icons/list.png',
			},
		},
		{
			title: 'Create New Event',
			arg: 'create',
			icon: {
				path: 'icons/add.png',
			},
		},
	]

	if (hasReminders)
	{
		items.push({
			title: 'Go to Reminders',
			arg: 'reminders',
			icon: {
				path: 'icons/list.png',
			},
		})
	}


	return JSON.stringify({ items: items })
}
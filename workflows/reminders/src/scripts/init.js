function run(argv) {
	const hasCalendarEvents = argv[0] === 'true'

	const items = [
		{
			title: 'Upcoming Reminders',
			arg: 'upcoming',
			icon: {
				path: 'icons/calendar.png',
			},
		},
		{
			title: 'Lists',
			arg: 'lists',
			icon: {
				path: 'icons/list.png',
			},
		},
		{
			title: 'Create New Reminders',
			arg: 'create',
			icon: {
				path: 'icons/add.png',
			},
		},
	]

	if (hasCalendarEvents)
	{
		items.push({
			title: 'Go to Calendar Events',
			arg: 'calendar',
			icon: {
				path: 'icons/jump.png',
			},
		})
	}


	return JSON.stringify({ items: items })
}
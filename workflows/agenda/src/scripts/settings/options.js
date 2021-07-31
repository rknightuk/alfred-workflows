function run(argv) {
	ObjC.import('stdlib');

	const reminders_enabled = $.getenv('reminders_enabled') === 'true' //
	const default_reminder_list = $.getenv('default_reminder_list') // 

	const calendars_enabled = $.getenv('calendars_enabled') === 'true' //
	const default_calendar = $.getenv('default_calendar') //

	const overview_enabled = $.getenv('overview_enabled') === 'true' //
	const overview_mode = $.getenv('overview_mode')

	const use_fantastical = $.getenv('use_fantastical') === 'true'

	const oneTypeEnabled = reminders_enabled || calendars_enabled

	let items = [
		{
			title: `${calendars_enabled ? 'Disable' : 'Enable'} Calendars`,
			subtitle: `Turn calendar support ${calendars_enabled ? 'off' : 'on'}`,
			arg: 'toggle',
			icon: {
				path: `icons/${calendars_enabled ? 'toggle-turnoff' : 'toggle-turnon'}.png`,
			},
			variables: {
				setting: 'calendars_enabled',
				newValue: calendars_enabled ? 'false' : 'true',
			}
		},
		{
			title: `${reminders_enabled ? 'Disable' : 'Enable'} Reminders`,
			subtitle: `Turn reminder support ${reminders_enabled ? 'off' : 'on'}`,
			arg: 'toggle',
			icon: {
				path: `icons/${reminders_enabled ? 'toggle-turnoff' : 'toggle-turnon'}.png`,
			},
			variables: {
				setting: 'reminders_enabled',
				newValue: reminders_enabled ? 'false' : 'true',
			}
		}
	]

	if (calendars_enabled) {
		items.push({
			title: 'Set Default Calendar for Events',
			subtitle: `Current default calendar: ${default_calendar}`,
			arg: 'text',
			icon: {
				path: 'icons/calendar.png',
			},
			variables: {
				setting: 'default_calendar',
				currentValue: default_calendar,
				settingName: 'Calendar',
			}
		})
	}

	if (reminders_enabled) {
		items.push({
			title: 'Set Default Reminders List',
			subtitle: `Current default list: ${default_reminder_list}`,
			arg: 'text',
			icon: {
				path: 'icons/reminder.png',
			},
			variables: {
				setting: 'default_reminder_list',
				currentValue: default_reminder_list,
				settingName: 'Reminder',
			}
		})
	}

	if (oneTypeEnabled)
	{
		items.push({
			title: `${use_fantastical ? 'Turn on' : 'Turn off'} Using Fantastical for Creating and Viewing`,
			subtitle: 'If this is on, Fantastical will be used for viewing events, and creating events and reminders',
			arg: 'toggle',
			icon: {
				path: 'icons/fantastical.png',
			},
			variables: {
				setting: 'use_fantastical',
				newValue: use_fantastical ? 'false' : 'true',
			}
		})

		items.push({
			title: `${overview_enabled ? 'Disable' : 'Enable'} Overview`,
			subtitle: `${overview_enabled ? 'Disable' : 'Enable'} the option to open an upcoming overview in the browser`,
			arg: 'toggle',
			icon: {
				path: 'icons/overview.png',
			},
			variables: {
				setting: 'overview_enabled',
				newValue: overview_enabled ? 'false' : 'true',
			}
		})
	}

	if (oneTypeEnabled && overview_enabled)
	{
		items.push({
			title: `Change Overview to ${overview_mode === 'dark' ? 'Light' : 'Dark'} Theme`,
			subtitle: `Currently using ${overview_mode} theme`,
			arg: 'toggle',
			icon: {
				path: `icons/${overview_mode}.png`,
			},
			variables: {
				setting: 'overview_mode',
				newValue: overview_mode === 'dark' ? 'light' : 'dark',
			}
		})
	}

	return JSON.stringify({ items })
}
var UpcomingEvents = (function() {
	return {
		get: function(todayOnly, listName, limit) {
			var app = Application.currentApplication();
			app.includeStandardAdditions = true;
			let command = './agendas upcoming'

			let reminders = []
			if (listName) {
				reminders = app.doShellScript(`./agendas show "${listName}";`)
			} else {
				reminders = app.doShellScript(`./agendas upcoming --limit ${limit};`)
			}

			const todayTS = new Date()
			const todayDate = todayTS.getDate() < 10 ? `0${todayTS.getDate()}` : todayTS.getDate();
			const todayMonth = (todayTS.getMonth() + 1) < 10 ? `0${(todayTS.getMonth() + 1)}` : todayTS.getMonth() + 1;
			const todayDateString = `${todayTS.getFullYear()}-${todayMonth}-${todayDate}`

			const tomorrowTS = new Date()
			tomorrowTS.setDate(tomorrowTS.getDate() + 1)
			const tomorrowDate = tomorrowTS.getDate() < 10 ? `0${tomorrowTS.getDate()}` : tomorrowTS.getDate();
			const tomorrowMonth = (tomorrowTS.getMonth() + 1) < 10 ? `0${(tomorrowTS.getMonth() + 1)}` : tomorrowTS.getMonth() + 1;
			const tomorrowDateString = `${tomorrowTS.getFullYear()}-${tomorrowMonth}-${tomorrowDate}`

			let items = []

			// const reminderData = reminders === '' ? [] : reminders.split('\r')

			reminderData = [
				{
				  "date" : "2021-07-31 07:00",
				  "id" : "0",
				  "title" : "Pick up bread",
				  "list" : "To Do",
				  "uuid" : "2EF8A946-B696-4012-BC3C-6A9C89E2A7E4"
				}
			]

			reminderData.forEach(ri => {
				// let parsed = JSON.parse(ri)
				parsed = ri

				const eventTS = new Date(parsed.date.replace(' ', 'T'))
				const isOverdue = eventTS < todayTS

			   	if (todayOnly && !parsed.date.includes(todayDateString)) return
		   		const time = parsed.date.split(' ')[1]
		   		let sort = time
		   		let dateOutput = time
		   		if (!todayOnly) {
		   			sort = parsed.date
		   			dateOutput = parsed.date.replace(todayDateString, 'Today at').replace(tomorrowDateString, 'Tomorrow at')
		   		}

		   		const icon = isOverdue ? 'alert' : 'reminder'

		   		items.push({
		   			title: parsed.title,
		   			subtitle: `${dateOutput}${listName ? '' : ` / ${parsed.list}`}`,
		   			arg: `r:${parsed.uuid}`,
		   			autocomplete: parsed.title,
		   			icon: {
		   				path: `icons/${icon}.png`,
		   			},
		   			sort,
		   			mods: {
			    		cmd: {
			    			arg: `open x-apple-reminderkit://REMCDReminder/${parsed.uuid}`,
			    			subtitle: 'Open Reminder'
			    		}
			    	}
		   		})
			})

			if (listName)
			{
				items.unshift({
					title: `Show any time reminders in ${listName}`,
					arg: `ANYTIME:${listName}`,
				})
			}

		  	return items
		},
	};
})();

// Add AMD compatibility.
if (typeof define === 'function' && define.amd) {
	define(UpcomingEvents);
}
// Add CommonJS compatibility.
else if (typeof module !== 'undefined' && module.exports) {
	module.exports = UpcomingEvents;
}

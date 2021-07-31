var UpcomingEvents = (function() {
	return {
		get: function(todayOnly, listName, limit) {
			var app = Application.currentApplication();
			app.includeStandardAdditions = true;

		  	const events = app.doShellScript(`./agendas events${listName ? ` "${listName}"`: ''} --limit ${limit};`)

		  	const todayTS = new Date()
		  	const todayDate = todayTS.getDate() < 10 ? `0${todayTS.getDate()}` : todayTS.getDate();
		  	const todayMonth = (todayTS.getMonth() + 1) < 10 ? `0${(todayTS.getMonth() + 1)}` : todayTS.getMonth() + 1;
		  	const todayDateString = `${todayTS.getFullYear()}-${todayMonth}-${todayDate}`

		  	const tomorrowTS = new Date()
		  	tomorrowTS.setDate(tomorrowTS.getDate() + 1)
		  	const tomorrowDate = tomorrowTS.getDate() < 10 ? `0${tomorrowTS.getDate()}` : tomorrowTS.getDate();
		  	const tomorrowMonth = (tomorrowTS.getMonth() + 1) < 10 ? `0${(tomorrowTS.getMonth() + 1)}` : tomorrowTS.getMonth() + 1;
		  	const tomorrowDateString = `${tomorrowTS.getFullYear()}-${tomorrowMonth}-${tomorrowDate}`

	  		// const eventData = events === '' ? [] : events.split('\r')
	  		let items = []
	  		const eventData = [
	  				{
	  				  "end" : "2021-08-02 00:00",
	  				  "allDay" : "true",
	  				  "start" : "2021-08-01 00:00",
	  				  "id" : "69111A1A-01E6-4EA8-B68B-0FC663C0D151",
	  				  "location" : "",
	  				  "title" : "Lazy Sunday",
	  				  "calendar" : "Robb - Home",
	  				  "confirmed" : "true"
	  				},
	  				{
	  				  "end" : "2021-08-02 11:30",
	  				  "allDay" : "false",
	  				  "start" : "2021-08-02 13:30",
	  				  "id" : "69111A1A-01E6-4EA8-B68B-0FC663C0D151",
	  				  "location" : "Nandos",
	  				  "title" : "Lunch with John",
	  				  "calendar" : "Shared",
	  				  "confirmed" : "true"
	  				},
	  			]


	  		eventData.forEach(ri => {
	  			// let parsed = JSON.parse(ri)
	  			parsed = ri
	  			parsed = {
	  				...parsed,
	  				allDay: parsed.allDay === 'true',
	  			}

	  			let startDate = parsed.start
	  		    let endDate = parsed.end

	  			const eventTS = new Date(parsed.start.replace(' ', 'T'))
	  			const isOverdue = eventTS < todayTS
	  			const isToday = parsed.start.includes(todayDateString)
	  			const isTomorrow = parsed.start.includes(tomorrowDateString)

	  			const [eventStartDate, eventStartTime] = startDate.split(' ')
	  		    const [eventEndDate, eventEndTime] = endDate.split(' ')

	  			const isAllDay = parsed.allDay
	  		    const isSameDay = !isAllDay && eventStartDate === eventEndDate

	  		   	if (todayOnly && !parsed.start.includes(todayDateString)) return
	  	   		let dateOutput = parsed.allDay ? 'All Day' : eventStartTime
	  	   		let sort = parsed.allDay ? 'All Day' : eventStartTime
	  	   		if (!todayOnly) {
	  	   			sort = parsed.start
	  	   			if (parsed.allDay)
	  	   			{
	  	   				dateOutput = `${eventStartDate} All Day`
	  	   			} else {
	  					dateOutput = parsed.start
	  	   			}
	  	   		}

	  	   		let icon = 'calendar'
	  	   		const titleLC = parsed.title.toLowerCase()
	  		    if (titleLC.includes('birthday'))
	  		    {
	  		    	icon = 'birthday'
	  		    } else if (titleLC.includes('holiday'))
	  		    {
	  		    	icon = 'holiday'
	  		    }

	  		     if (isToday)
	  		    {
	  				startDate = parsed.start.replace(todayDateString, 'Today at')
	  				icon = 'today'
	  		    } else if (isTomorrow)
	  		    {
	  		    	startDate = parsed.start.replace(tomorrowDateString, 'Tomorrow at')
	  		    }

	  		    startDate = startDate.replace(' at 00:00', '')

	  		    let subtitle = `${startDate}`
	  		    if (isAllDay) {
	  		    	subtitle = 'All Day'
	  		    	if (isToday) {
	  		    		subtitle += ' Today'
	  		    	} else if (isTomorrow) {
	  					subtitle += ' Tomorrow'
	  		    	} else {
	  		    		subtitle = `${eventStartDate} All Day`
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
	  		    
	  		    subtitle = `${subtitle}${listName ? '' : ` / ${parsed.calendar}`} `

	  		    if (todayOnly) subtitle = subtitle.replace('Today at ', '')

  		    	items.push({
  		    		title: parsed.title,
  		    		subtitle,
  		    		arg: `c:${eventStartDate}`,
  		    		autocomplete: parsed.title,
  		    		icon: {
  		    			path: `icons/${icon}.png`,
  		    		},
  		    		sort,
  		    	})
	  		})

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

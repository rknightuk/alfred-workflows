// Modified from https://github.com/surrealroad/alfred-reminders

var require = function (path) {
  if (typeof app === 'undefined') {
    app = Application.currentApplication();
    app.includeStandardAdditions = true;
  }

  var handle = app.openForAccess(path);
  var contents = app.read(handle);
  app.closeAccess(path);

  var module = {exports: {}};
  var exports = module.exports;
  eval(contents);

  return module.exports;
};

ObjC.import('Foundation');
ObjC.import('stdlib');
var window = {}

function run(argv) {
	const query = argv[0]
		
	// https://github.com/dtinth/JXA-Cookbook/wiki/Importing-Scripts
	const sherlockPath = $.getenv('alfred_preferences') + "/workflows/" + $.getenv('alfred_workflow_uid') + "/scripts/events/sherlock.js"

	const Sherlock = require(sherlockPath);

	const data = Sherlock.parse(query);

	if (!data.startDate)
	{
			return 'INVALID'
	}

	const start = new Date(data.startDate)
	const startHours = start.getHours() < 10 ? `0${start.getHours()}` : start.getHours();
	const startMinutes = start.getMinutes() < 10 ? `0${start.getMinutes()}` : start.getMinutes();
	const startDate = start.getDate() < 10 ? `0${start.getDate()}` : start.getDate();
  const startMonth = (start.getMonth() + 1) < 10 ? `0${(start.getMonth() + 1)}` : start.getMonth() + 1;
  const startDateString = `${start.getFullYear()}-${startMonth}-${startDate} ${startHours}:${startMinutes}`

  const end = data.endDate ? new Date(data.endDate) : null
  let endDateString = null
  if (end)
  {
  		const endHours = end.getHours() < 10 ? `0${end.getHours()}` : end.getHours();
			const endMinutes = end.getMinutes() < 10 ? `0${end.getMinutes()}` : end.getMinutes();
			const endDate = end.getDate() < 10 ? `0${end.getDate()}` : end.getDate();
		  const endMonth = (end.getMonth() + 1) < 10 ? `0${(end.getMonth() + 1)}` : end.getMonth() + 1;
		  endDateString = `${end.getFullYear()}-${endMonth}-${endDate} ${endHours}:${endMinutes}`
  }

  let location = query.split('@')
  location = location.length > 1 ? location[1].trim() : null

  if (location)
  {
  	data.eventTitle = data.eventTitle.split('@')[0].trim()
  }

	// {"isAllDay":false,"eventTitle":"The party","startDate":"2021-07-22T14:00:00.000Z","endDate":"2021-07-22T16:00:00.000Z"}

	env = {"alfredworkflow":{
			"arg": '', 
			"variables": {
				"neweventstart": startDateString,
				"neweventend": endDateString,
				"neweventtitle": data.eventTitle,
				"neweventallday": data.isAllDay,
				"neweventlocation": location,
			}
		}
	};
	return JSON.stringify(env);
}
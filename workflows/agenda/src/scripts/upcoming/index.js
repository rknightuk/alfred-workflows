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
	const remindersEnabled = argv[0] === 'true'
	const calendarsEnabled = argv[1] === 'true'
	const todayOnly = argv[2] === '1'
	const listName = argv[3]
	const overviewEnabled = $.getenv('overview_enabled') === 'true'
	const limit = todayOnly ? 1 : $.getenv('upcoming_days')

	const remindersPath = $.getenv('alfred_preferences') + "/workflows/" + $.getenv('alfred_workflow_uid') + "/scripts/reminders/lib/upcoming.js"
	const UpcomingReminders = require(remindersPath);
	const reminders = remindersEnabled ? UpcomingReminders.get(todayOnly, listName, limit) : [];
 
	const eventsPath = $.getenv('alfred_preferences') + "/workflows/" + $.getenv('alfred_workflow_uid') + "/scripts/events/lib/upcoming.js"
	const UpcomingEvents = require(eventsPath);
	const events = calendarsEnabled ? UpcomingEvents.get(todayOnly, listName, limit) : [];

	let mergedItems = [...reminders, ...events].sort((a,b) => (a.sort > b.sort) ? 1 : ((b.sort > a.sort) ? -1 : 0))

	if (!listName && overviewEnabled && mergedItems.length > 0)
	{
		let outputHTML = ''
		mergedItems.map(mi => {
			outputHTML += '<blockquote><p><strong>' + mi.title + '</strong></p><p>' + mi.subtitle + '</p></blockquote>'
		})
		mergedItems.unshift({
			title: 'Open Overview Page',
			arg: outputHTML,
			autocomplete: 'Open Overview Page',
			icon: {
				path: 'icons/overview.png',
			},
			mods: {
				cmd: {
					subtitle: 'Please think about the environment before printing this overview 😏️'
				}
			}
		})
	}

	if (mergedItems.length === 0)
	{
		mergedItems = [{
			title: 'Nothing upcoming, take a break! Hydrate! Go outside!'
		}]
	}

	return JSON.stringify({ items: mergedItems })
}
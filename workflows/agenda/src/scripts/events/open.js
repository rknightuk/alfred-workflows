function run(argv) {
	var query = argv[0];
	var app = Application.currentApplication()
	app.includeStandardAdditions = true
	var Calendar = Application("Calendar")
	var date = new Date(query)
	Calendar.switchView({to: "day view"})
	Calendar.viewCalendar({at: date})
}
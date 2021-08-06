function run(argv) {
	ObjC.import('stdlib');
	var app = Application.currentApplication();
	app.includeStandardAdditions = true;

	const newValue = argv[0]

	Application('com.runningwithcrayons.Alfred').setConfiguration('vpn_to_toggle', {
	    toValue: newValue,
	    inWorkflow: $.getenv('alfred_workflow_bundleid'),
	    exportable: false,
	})

	return `Updated ${setting} to ${newValue}`
}
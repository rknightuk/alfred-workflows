function run(argv) {
	ObjC.import('stdlib');
	var app = Application.currentApplication();
	app.includeStandardAdditions = true;

	const setting = $.getenv('setting')
	const newValue = $.getenv('newValue')

	Application('com.runningwithcrayons.Alfred').setConfiguration(setting, {
	    toValue: newValue,
	    inWorkflow: $.getenv('alfred_workflow_bundleid'),
	    exportable: true
	})

	return `Updated ${setting} to ${newValue}`
}
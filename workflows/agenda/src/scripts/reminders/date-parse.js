// Modified from https://github.com/surrealroad/alfred-reminders

ObjC.import('Foundation');
ObjC.import('stdlib');
var window = {} // required for chrono.js to function properly, see https://github.com/wanasit/chrono/issues/34

function run(argv) {
	var query = argv[0],
		results = {},
		jsonResult = {};
		
	if(! window.chrono) { 
		//https://github.com/dtinth/JXA-Cookbook/wiki/Importing-Scripts

		//http://www.alfredforum.com/topic/9070-how-to-workflowenvironment-variables/
		//https://www.alfredapp.com/help/workflows/script-environment-variables/
		var chronoPath = $.getenv('alfred_preferences') + "/workflows/" + $.getenv('alfred_workflow_uid') + "/scripts/reminders/chrono.min.js"

		var fm = $.NSFileManager.defaultManager;
		var contents = fm.contentsAtPath(chronoPath); // NSData
		contents = $.NSString.alloc.initWithDataEncoding(contents, $.NSUTF8StringEncoding);

		eval(ObjC.unwrap(contents));
	}

	date = window.chrono.parseDate(query)
	text = window.chrono.parse(query)[0] ? window.chrono.parse(query)[0].text : null

	env = {"alfredworkflow":{
			"arg": '', 
			"variables": {
				"date": date,
				"date_text": text,
				"reminder_text": query.replace(' ' + text, ''),
			}
		}
	};
	return JSON.stringify(env);
}
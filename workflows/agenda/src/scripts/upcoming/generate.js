function run(argv) {
	ObjC.import('stdlib');
	var app = Application.currentApplication();
	app.includeStandardAdditions = true;

	const items = argv[0]
	const mode = argv[1]
	const cssPath = $.getenv('alfred_preferences') + "/workflows/" + $.getenv('alfred_workflow_uid') + '/'

	let html = app.doShellScript('cat ./scripts/upcoming/template/_template.html');
	html = html.replace('{{ mode }}', mode).replace('{{ items }}', items).replace('{{ cssPath }}', cssPath)

	app.doShellScript(`touch .tmp_overview.html; echo "${html}" > ./.tmp_overview.html`)

	app.doShellScript(`open ./.tmp_overview.html`)
}
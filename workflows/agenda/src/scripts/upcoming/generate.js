function run(argv) {
	ObjC.import('stdlib');
	var app = Application.currentApplication();
	app.includeStandardAdditions = true;

	const items = argv[0]
	const mode = argv[1]
	const cssPath = $.getenv('alfred_preferences') + "/workflows/" + $.getenv('alfred_workflow_uid') + '/'

	let html = app.doShellScript('cat ./scripts/upcoming/template/_template.html');
	html = html.replace('{{ mode }}', mode).replace('{{ items }}', items).replace('{{ cssPath }}', cssPath)

	tempDir = app.doShellScript('mktemp -d')
	tempFile = app.doShellScript(`mktemp ${tempDir}/overview.html`)

	app.doShellScript(`echo "${html}" > ${tempFile}`)

	app.doShellScript(`open ${tempFile}`)
}
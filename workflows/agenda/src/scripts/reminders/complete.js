function run(argv) {
	var app = Application.currentApplication();
	app.includeStandardAdditions = true;

	const uuid = argv[0]

	return app.doShellScript(`./agendas complete-by-uuid ${uuid}`)
}
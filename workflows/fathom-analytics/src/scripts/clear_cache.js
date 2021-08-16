function run(argv) {
	const app = Application.currentApplication();
	app.includeStandardAdditions = true;

	const cacheFile = Path(`${$.getenv('alfred_workflow_data')}/site_cache.json`)
	app.doShellScript(`rm -rf "${cacheFile}"`)
}
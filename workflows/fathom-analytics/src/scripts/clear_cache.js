function run(argv) {
	const app = Application.currentApplication();
	ObjC.import("stdlib")
	app.includeStandardAdditions = true;

	const cacheFile = Path(`${$.getenv('alfred_workflow_data')}/site_cache.json`)
	console.log(cacheFile)
	app.doShellScript(`rm -rf "${cacheFile}"`)
}
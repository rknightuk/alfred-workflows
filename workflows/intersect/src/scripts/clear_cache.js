function run(argv) {
	const app = Application.currentApplication()
	app.includeStandardAdditions = true
    ObjC.import('stdlib')
	const files = [
		'page_cache.json',
		'link_cache.json'
	]

	files.forEach(cache => {
		cacheFile = Path(`${$.getenv('alfred_workflow_data')}/${cache}`)
		app.doShellScript(`rm -rf "${cacheFile}"`)
	})
}
function run(argv) {
	const app = Application.currentApplication();
	app.includeStandardAdditions = true;
	ObjC.import('stdlib');

	const finderApp = Application("Finder");
	const cacheFile = Path(`${$.getenv('alfred_workflow_data')}/site_cache.json`)
	const cacheFileExists = finderApp.exists(cacheFile)

	if (cacheFileExists)
	{
		ObjC.import('Foundation');
		const fm = $.NSFileManager.defaultManager;
		let contents = fm.contentsAtPath(cacheFile.toString());
		contents = $.NSString.alloc.initWithDataEncoding(contents, $.NSUTF8StringEncoding);
		const sites = JSON.parse(ObjC.unwrap(contents))

		return JSON.stringify({ items: sites })
	}

	return JSON.stringify({ items: [{ title: 'fuckky fuck' }]})

	const API_KEY = $.getenv('api_key')
	const request = `curl https://api.usefathom.com/v1/sites -H "Authorization: Bearer ${API_KEY}"`
	const response = app.doShellScript(request)
	const rawSites = JSON.parse(response).data || []

	if (rawSites.length === 0)
	{
		return JSON.stringify({ items: [{
			title: 'No Sites Found',
			arg: 'noop',
		}]})
	}

	const items = rawSites.map(s => {
		return {
			title: s.name,
			variables: {
				selected_site_id: s.id,
				selected_site_name: s.name,
			},
			mods: {
				cmd: {
					arg: `https://app.usefathom.com/#/?site=${s.id}`,
					subtitle: `View ${s.name} in Fathom`,
				}
			}
		}
	})

	// cache sites
	app.doShellScript(`[[ -d "${$.getenv('alfred_workflow_data')}" ]] || mkdir "${$.getenv('alfred_workflow_data')}"`)
	const cachePath = `${$.getenv('alfred_workflow_data')}/site_cache.json`
	app.doShellScript(`rm -rf "${cachePath}"`)
	ObjC.import('Foundation');
	app.doShellScript(`touch "${cachePath}"`)
	const cacheData = JSON.stringify(items)
	const cacheFileWrite = app.openForAccess(Path(cachePath), { writePermission: true })
	app.setEof(cacheFileWrite, { to: 0 })
	app.write(cacheData, { to: cacheFileWrite, startingAt: app.getEof(cacheFileWrite) })
	app.closeAccess(cacheFileWrite)

	return JSON.stringify({ items })
}
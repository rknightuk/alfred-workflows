function run(argv) {
	var app = Application.currentApplication();
	app.includeStandardAdditions = true;
	ObjC.import('stdlib');

	const API_KEY = $.getenv('api_key')

	// todo cache sites
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

	return JSON.stringify({ items })
}
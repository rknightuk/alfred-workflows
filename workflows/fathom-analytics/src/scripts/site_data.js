visitorText = (count) => {
	let currentText = `${count} current visitor${count == 1 ? '' : 's'}`
	if (count === 0)
	{
		currentText = `No visitors right now :(`
	}

	return currentText
}

function run(argv) {
	var app = Application.currentApplication();
	app.includeStandardAdditions = true;
	ObjC.import('stdlib');

	const API_KEY = $.getenv('api_key')
	const selectedSiteId = $.getenv('selected_site_id')
	const selectedSiteName = $.getenv('selected_site_name')

	const request = `curl https://api.usefathom.com/v1/current_visitors \
-H "Authorization: Bearer ${API_KEY}" \
-d site_id=${selectedSiteId} \
-G`
	const response = app.doShellScript(request)
	const data = JSON.parse(response)
	const current = data.total || 0
	const content = data.content || []
	const mods = {
		cmd: {
			arg: `https://app.usefathom.com/#/?site=${selectedSiteId}`,
			subtitle: `View ${selectedSiteName} in Fathom`,
		}
	}

	const items = [{
		title: visitorText(current),
		subtitle: current == 69 ? 'Nice!' : '',
		...mods,
	}]

	content.forEach(c => {
		items.push({
			title: c.pathname,
			subtitle: visitorText(c.total),
			arg: `${c.hostname}${c.pathname.replace('/', '')}`,
			...mods,
		})
	})

	return JSON.stringify({ items })
}
function run(argv)
{
	const app = Application.currentApplication();
	app.includeStandardAdditions = true;
    ObjC.import('stdlib');

    const API_KEY = $.getenv('api_key')
	const SITE = $.getenv('site')

	let content = argv[0]
	var regexp = /\B\#\w\w+\b/g
    categories = (content.match(regexp) || []).map(c => {
		content = content.replace(c, '')
		return `category[]=${c.replace('#', '')}`
	}).join('&')

	let query = `content=${encodeURIComponent(content)}&mp-destination=${SITE}`
	if (categories)
	{
		query += `&${categories}`
	}
	
	const request = `curl -X POST "https://micro.blog/micropub?h=entry&${query}" -H "Authorization: Bearer ${API_KEY}"`
	const response = app.doShellScript(request)

	return JSON.parse(response).url || false
}
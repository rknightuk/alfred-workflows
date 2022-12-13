function run()
{
    const app = Application.currentApplication();
	app.includeStandardAdditions = true;
    ObjC.import('stdlib');

    const API_KEY = $.getenv('api_key')
	const request = `curl https://micro.blog/posts/bookmarks -H "Authorization: Bearer ${API_KEY}"`
	const response = app.doShellScript(request)
	const bookmarks = JSON.parse(response).items


    const items = bookmarks.map(b => {
		return {
			title: b.content_html.replace(/<[^>]*>/g, ''),
            subtitle: b.url,
            arg: b.url,
			variables: {
				bookmark_id: b.id,
			},
			mods: {
				cmd: {
					arg: b.id,
					subtitle: 'Delete Bookmark',
				},
				alt: {
					arg: b.url,
					subtitle: 'Copy URL',
				},
			}
		}
	})

    return JSON.stringify({ items })
}
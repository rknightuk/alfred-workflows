function run(bookmarkId)
{
    console.log(`Bookmark ID: ${bookmarkId}`)
    const app = Application.currentApplication();
	app.includeStandardAdditions = true;
    ObjC.import('stdlib');

    const API_KEY = $.getenv('api_key')
	const request = `curl -X DELETE https://micro.blog/posts/bookmarks/${bookmarkId} -H "Authorization: Bearer ${API_KEY}"`
	app.doShellScript(request)
}
function run(argv)
{

	const app = Application.currentApplication();
	app.includeStandardAdditions = true;
    ObjC.import('stdlib');

    const API_KEY = $.getenv('api_key')
	const USERNAME = $.getenv('username')

	const filename = argv[0]
    const content = argv[1]

    const json = JSON.stringify({title: filename, content: content})
	
	const request = `curl --location --request POST --header 'Authorization: Bearer ${API_KEY}' 'https://api.omg.lol/address/${USERNAME}/pastebin/' --data '${json}'`
	const response = app.doShellScript(request)

	console.log(response)

	return JSON.parse(response).response.title || false
}
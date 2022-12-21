function run(argv)
{

	const app = Application.currentApplication();
	app.includeStandardAdditions = true;
    ObjC.import('stdlib');

    const API_KEY = $.getenv('api_key')
	const USERNAME = $.getenv('username')

	const content = argv[0]
	const emoji = argv[1]
	
	const request = `curl --location --request POST --header 'Authorization: Bearer ${API_KEY}' 'https://api.omg.lol/address/${USERNAME}/statuses/' --data '{"emoji": "${emoji}", "content": "${content}"}'`
	const response = app.doShellScript(request)

	console.log(response)

	return JSON.parse(response).response.url || false
}
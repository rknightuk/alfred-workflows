function run(argv) {
	const app = Application.currentApplication();
	const systemEvents = Application("System Events")
	app.includeStandardAdditions = true;

	const isSetApp = app.doShellScript('[ -f /Library/Application Support/com.tinyapp.TablePlus-setapp ] && echo true || echo false') === 'true'
	let basePath = `~/Library/Application Support/com.tinyapp.TablePlus${isSetApp ? '-setapp' : ''}/Data`

	let sharedConnectionPath = app.doShellScript('defaults read com.tinyapp.TablePlus' + (isSetApp ? '-setapp' : '') + ' ViewSetting | grep "SharedConnectionPath"');
	sharedConnectionPath = sharedConnectionPath.split(' = ')[1].trim().replaceAll('"', '').replaceAll(';', '')
	if (sharedConnectionPath) basePath = sharedConnectionPath

	const connections = systemEvents.propertyListFiles.byName(`${basePath}/Connections.plist`).contents.value()
	let groups = {}
	systemEvents.propertyListFiles.byName(`${basePath}/ConnectionGroups.plist`).contents.value().forEach(g => {
		groups[g.ID] = g.Name
	})

	const items = connections.map(connection => {
	    return {
	    	uid: connection.ID,
	    	title: `${connection.ConnectionName} » ${connection.Driver}`,
	    	subtitle: `${groups[connection.GroupID]} » ${connection.Enviroment}`,
	    	arg: `tableplus://?id=${connection.ID}`,
	    	valid: true,
	    }
	})

	return JSON.stringify({ items: items, groups })
}
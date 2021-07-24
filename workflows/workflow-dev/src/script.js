const workflowPath = '/Users/robb/Dropbox/Alfred/Alfred.alfredpreferences/workflows';
const se = Application('System Events');
const workflows = se.folders.byName(workflowPath).diskItems.name()

let items = workflows.map(wf => {
	const data = se.propertyListFiles.byName(`${workflowPath}/${wf}/info.plist`).contents.value()
	const { 
		name, 
		createdby,
		bundleid,
	} = data

	const title = `${name.includes('//') ? 'draft' : ''} ${name}`

	return {
		uid: bundleid,
		title: title.trim(),
		subtitle: createdby ? `by ${createdby}` : createdby,
		arg: `${title}:${workflowPath}/${wf}`,
		autocomplete: `${title} ${createdby}`,
		icon: {
			path: `${workflowPath}/${wf}/icon.png`,
		}
	}
})

JSON.stringify({ items: [
	{
		title: 'Edit Backup Project',
		arg: 'Edit Backup Project:/Users/robb/Sites/personal/alfred-workflows',
	}, ...items
]})
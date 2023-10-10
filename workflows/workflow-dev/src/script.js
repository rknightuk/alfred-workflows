function run(argv) {
	const workflowPath = argv[0] + '/workflows'
	console.log(workflowPath)
	const se = Application('System Events');
	console.log('hello')
	const workflows = se.folders.byName(workflowPath).diskItems.name()
	console.log('what')

	let items = []

	workflows.forEach(wf => {
		console.log('what')
		let data = null
		try {
			data = se.propertyListFiles.byName(`${workflowPath}/${wf}/info.plist`).contents.value()
		} catch {
			// no data
			return
		}
		const { 
			name, 
			createdby,
			bundleid,
		} = data

		const title = `${name.includes('//') ? '(draft)' : ''} ${name}`

		items.push({
			uid: bundleid,
			title: title.trim(),
			subtitle: createdby ? `by ${createdby}` : createdby,
			arg: `${workflowPath}/${wf}`,
			autocomplete: `${title} ${createdby}`,
			icon: {
				path: `${workflowPath}/${wf}/icon.png`,
			},
			variables: {
				name: title.trim(),
				path: `${workflowPath}/${wf}`,
			}
		})
	})

	return JSON.stringify({ items })
}
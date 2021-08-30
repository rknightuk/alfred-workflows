function run(argv) {
	const projectPath = 'Users/robb/Sites/personal'
	const se = Application('System Events');
	const projects = se.folders.byName(projectPath).diskItems.name()

	let items = projects.map(wf => {
		const path = `/${projectPath}/${wf}`
		return {
			title: wf,
			arg: path,
			variables: {
				path,
			}
		}
	})

	return JSON.stringify({ items })
}
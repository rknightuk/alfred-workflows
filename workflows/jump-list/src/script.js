function run() {
	const markPath = '~/.marks'
	const app = Application.currentApplication();
	app.includeStandardAdditions = true;

	const se = Application('System Events');
	const marks = se.folders.byName(markPath).diskItems.name()

	return JSON.stringify({ items: marks.map(mark => {
		const path = app.doShellScript(`cd ${markPath}/${mark}; pwd -P`)
		let title = mark

		return {
			title: title,
			subtitle: path,
			arg: path,
			mods: {
				alt: {
					arg: `terminal`,
					subtitle: 'Open in Terminal'
				}
			},
			text: {
				copy: path,
			},
			variables: {
				path,
			}
		}

		return data
	})})
}
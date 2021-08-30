function run(argv) {
	const name = argv[0]
	const items = [
		{
			title: `Open in Editor`,
			arg: 'editor',
			icon: {
				path: 'icons/editor.png'
			}
		},
		{
			title: `Open in Terminal`,
			arg: 'terminal',
			icon: {
				path: 'icons/terminal.png'
			}
		},
		{
			title: `Open in Finder`,
			arg: 'finder',
			icon: {
				path: 'icons/finder.png'
			}
		},
		{
			title: `Open in All`,
			arg: 'all',
			icon: {
				path: 'icons/all.png'
			}
		},

	]

	return JSON.stringify({ items: items })
}
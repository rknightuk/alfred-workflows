function run(argv) {
	const [ name, path ] = argv[0].split(':')
	const items = [
		{
			title: 'Open in Sublime',
			arg: 'sublime',
			icon: {
				path: 'icons/sublime.png'
			}
		},
		{
			title: 'Open in Terminal',
			arg: 'terminal',
			icon: {
				path: 'icons/terminal.png'
			}
		},
		{
			title: 'Open in Finder',
			arg: 'finder',
			icon: {
				path: 'icons/finder.png'
			}
		},
		{
			title: 'Open in All',
			arg: 'all',
			icon: {
				path: 'icons/all.png'
			}
		},

	]

	return JSON.stringify({ items: items })
}
function run(argv) {
	const name = argv[0]
	const items = [
		{
			title: `Open ${name} in Sublime`,
			arg: 'sublime',
			icon: {
				path: 'icons/sublime.png'
			}
		},
		{
			title: `Open ${name} in Terminal`,
			arg: 'terminal',
			icon: {
				path: 'icons/terminal.png'
			}
		},
		{
			title: `Open ${name} in Finder`,
			arg: 'finder',
			icon: {
				path: 'icons/finder.png'
			}
		},
		{
			title: `Open ${name} in All`,
			arg: 'all',
			icon: {
				path: 'icons/all.png'
			}
		},

	]

	return JSON.stringify({ items: items })
}
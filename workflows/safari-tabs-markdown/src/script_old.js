function run(argv) {
	// md_list or one_per_line
	const isMarkdown = argv[0].includes('_list')
	const all = argv[0].includes('all')

	var Safari = Application('Safari')

	Safari.includeStandardAdditions = true

	var links = []
	const tabs = all ? Safari.windows[0].tabs() : [Safari.windows[0].currentTab]

	
	tabs.forEach(function(tab) {
		const url = tab.url().split('?')[0]
		links.push(`${isMarkdown ? '- ' : ''}[${tab.name()}](${url})`)
	})

	let joiner = "\n\n"
	if (isMarkdown) joiner = "\n"

	return links.join(joiner)
}

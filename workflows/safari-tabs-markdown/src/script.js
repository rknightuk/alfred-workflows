function run(argv) {
	// md_list or one_per_line
	const isMarkdown = argv[0] === 'md_list'

	var Safari = Application('Safari');

	Safari.includeStandardAdditions = true;

	var links = [];

	Safari.windows[0].tabs().forEach(function(tab) {
		links.push(`${isMarkdown ? '- ' : ''}[${tab.name()}](${tab.url()})`)
	})

	let joiner = "\n\n"
	if (isMarkdown) joiner = "\n"

	return links.join(joiner)
}
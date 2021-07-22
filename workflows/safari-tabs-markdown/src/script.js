function run(argv) {
	var Safari = Application('Safari');

	Safari.includeStandardAdditions = true;

	var links = [];

	Safari.windows[0].tabs().forEach(function(tab) {
		links.push(`[${tab.name()}](${tab.url()})`)
	})

	return links.join("\n\n")
}
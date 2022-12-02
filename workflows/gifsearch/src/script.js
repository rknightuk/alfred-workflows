function run(argv)
{
    ObjC.import('stdlib');

	const search = argv[0]
	const gifPath = $.getenv('gif_path')
	const se = Application('System Events');
	const gifs = se.folders.byName(gifPath).diskItems.name()

    let items = gifs
		.filter(g => g.includes('.gif'))

	if (search && search !== '')
	{
		items = items.filter(i => {
			return i.toLowerCase().includes(search.toLowerCase())
		})
	}

	items = items.map(gif => {
		return {
			title: gif,
			arg: `${gifPath}/${gif}`,
			icon: {
				path: `${gifPath}/${gif}`,
			},
			variables: {
				path: `${gifPath}/${gif}`,
			}
		}
	})

	return JSON.stringify({ items })
}
let baseUrl = null
formatPages = (rawPages) => {
    return rawPages.map(r => {
        const liveUrl = `${baseUrl}${r.url}`
        const title = `${r.parents.length > 0 ? `${r.parents.join('›')} › ` : ''}${r.title}`
        return {
            title,
            subtitle: r.url,
            match: r.text,
            arg: liveUrl,
            mods: {
                cmd: {
                    arg: `${$.getenv('project_path')}${r.filePath}`,
                    subtitle: 'Open in Editor'
                }
            },
            text: {
                copy: liveUrl,
                largetype: title,
            }
        }
    })
}

formatLinks = (rawLinks) => {
    return rawLinks.map(r => {
        return {
            title: r.title,
            subtitle: r.link,
            match: r.title.toLowerCase(),
            arg: r.link,
            text: {
                copy: r.link,
                largetype: r.title,
            },
            mods: {
                cmd: {
                    arg: `${baseUrl}/${r.source.url}`,
                    subtitle: `Open ${r.source.title}`
                }
            },
        }
    })
}

function run(argv) {
	const app = Application.currentApplication()
	app.includeStandardAdditions = true
	ObjC.import('stdlib')
    const query = argv[0]
    const type = argv[1]
    const isPages = type === 'pages'
    const dataFormatter = isPages ? formatPages : formatLinks
    const cacheFileName = isPages ? 'page_cache.json' : 'link_cache.json'
    const searchKey = isPages ? 'content' : 'links'

    baseUrl = $.getenv('base_url')

	const finderApp = Application("Finder")
	const cacheFile = Path(`${$.getenv('alfred_workflow_data')}/${cacheFileName}`)
	const cacheFileExists = finderApp.exists(cacheFile)

	if (cacheFileExists)
	{
		ObjC.import('Foundation')
		const fm = $.NSFileManager.defaultManager
		let contents = fm.contentsAtPath(cacheFile.toString())
		contents = $.NSString.alloc.initWithDataEncoding(contents, $.NSF8StringEncoding)
		items = JSON.parse(ObjC.unwrap(contents))
	} else {
        const request = `curl "${baseUrl}/search.json"`
        const response = app.doShellScript(request)
        rawPages = JSON.parse(response)[searchKey] || []

        items = dataFormatter(rawPages)

        if (rawPages.length > 0)
        {
            app.doShellScript(`[[ -d "${$.getenv('alfred_workflow_data')}" ]] || mkdir "${$.getenv('alfred_workflow_data')}"`)
            const cachePath = `${$.getenv('alfred_workflow_data')}/${cacheFileName}`
            app.doShellScript(`rm -rf "${cachePath}"`)
            app.doShellScript(`touch "${cachePath}"`)
            const cacheData = JSON.stringify(items)
            const cacheFileWrite = app.openForAccess(Path(cachePath), { writePermission: true })
            app.setEof(cacheFileWrite, { to: 0 })
            app.write(cacheData, { to: cacheFileWrite, startingAt: app.getEof(cacheFileWrite) })
            app.closeAccess(cacheFileWrite)
        }
    }

    results = []


    items.forEach(i => {
        if (i.match.toLowerCase().includes(query))
        {
            results.push({
                ...i,
                arg: `${i.arg}?q=${query}`
            })
        }
    })

    if (results.length === 0) {
        results = [
            {
                title: 'No Results Found',
            }
        ]
    }

    return JSON.stringify({ items: results })
}
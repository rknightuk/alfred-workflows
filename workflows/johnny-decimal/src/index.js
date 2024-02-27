const app = Application.currentApplication()
const se = Application('System Events')
app.includeStandardAdditions = true
ObjC.import("stdlib")

const writeCache = (items, name) => {
    app.doShellScript(`[[ -d "${$.getenv('alfred_workflow_cache')}" ]] || mkdir "${$.getenv('alfred_workflow_cache')}"`)
    const cachePath = `${$.getenv('alfred_workflow_cache')}/${name}.json`
    console.log(cachePath)
    ObjC.import('Foundation');
    app.doShellScript(`touch "${cachePath}"`)
    const cacheData = JSON.stringify({ items })
    const cacheFileWrite = app.openForAccess(Path(cachePath), { writePermission: true })
    app.setEof(cacheFileWrite, { to: 0 })
    app.write(cacheData, { to: cacheFileWrite, startingAt: app.getEof(cacheFileWrite) })
    app.closeAccess(cacheFileWrite)
}

const filterOutFiles = (items, path) => {
	return items.filter(a => {
		return app.doShellScript(`if [[ -d "${path}/${a}" ]]; then echo "true"; else echo "false"; fi`) === 'true'
	})
}

function run(argv) {
    ['areas', 'categories', 'items'].forEach(j => {
        const finderApp = Application("Finder");
        const cacheFile = Path(`${$.getenv('alfred_workflow_cache')}/${j}.json`)
        const cacheFileExists = finderApp.exists(cacheFile)

        if (cacheFileExists)
        {
            app.doShellScript(`rm -rf "${cacheFile}"`)
        }
    })

    const jdRoot = argv[0]
    const generateIndexFile = argv[1] === '1'
    const indexFilePref = argv[2]

    const areas = filterOutFiles(se.folders.byName(jdRoot).diskItems.name().sort(), jdRoot)

    let areaData = []
    let categoryData = []
    let itemData = []
    let indexData = []

    areas.forEach(a => {
        areaData.push({
            title: a,
            arg: `${jdRoot}/${a}`,
        })

        indexData.push(a)

        filterOutFiles(se.folders.byName(`${jdRoot}/${a}`).diskItems.name().sort(), `${jdRoot}/${a}`).forEach(c => {
            categoryData.push({
                title: c,
                arg: `${jdRoot}/${a}/${c}`,
                subtitle: `${a}`
            })
            indexData.push(`  ${c}`)

            filterOutFiles(se.folders.byName(`${jdRoot}/${a}/${c}`).diskItems.name().sort(), `${jdRoot}/${a}/${c}`).forEach(i => {
                itemData.push({
                    title: i,
                    arg: `${jdRoot}/${a}/${c}/${i}`,
                    subtitle: `${a} > ${c}`
                })

                indexData.push(`    ${i}`)
            })
        })
    })

    writeCache(areaData, 'areas')
    writeCache(categoryData, 'categories')
    writeCache(itemData, 'items')

    if (generateIndexFile)
    {
        const indexFileLocation = indexFilePref || jdRoot
        const indexFilePath = `${indexFileLocation}/index.md`
        app.doShellScript(`touch "${indexFilePath}"`)

        const cacheFileWrite = app.openForAccess(Path(indexFilePath), { writePermission: true })
        app.setEof(cacheFileWrite, { to: 0 })
        app.write(indexData.join('\n'), { to: cacheFileWrite, startingAt: app.getEof(cacheFileWrite) })
        app.closeAccess(cacheFileWrite)
    }
}
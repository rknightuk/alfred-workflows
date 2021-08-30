const FORMATS = {
    MD_LIST: 'md_list',
    MD_LINK: 'md_link',
    LINK_ONLY: 'link',
    TITLE_ONLY: 'title',
    TITLE_LINK: 'title_link',
}

function run(argv) {
    const allLinks = argv[0] === 'all'
    const format = argv[1]
    const markdownAsList = format === FORMATS.MD_LIST

    var Safari = Application('Safari')
    Safari.includeStandardAdditions = true

    var links = []
    const tabs = allLinks ? Safari.windows[0].tabs() : [Safari.windows[0].currentTab]

    tabs.forEach(function(tab) {
        const url = tab.url().split('?')[0] // remove all query BS

        switch(format) {
            case FORMATS.MD_LIST:
            case FORMATS.MD_LINK:
                links.push(`${markdownAsList ? '- ' : ''}[${tab.name()}](${url})`)
                break;
            case FORMATS.LINK_ONLY:
                links.push(url)
                break;
            case FORMATS.TITLE_ONLY:
                links.push(tab.name())
                break;
            case FORMATS.TITLE_LINK:
                links.push(`${tab.name()} ${url}`)
                break;
            default:
                links.push(`${tab.name()} ${url}`)
        }
    })

    let joiner = "\n\n"
    if (markdownAsList) joiner = "\n"

    return links.join(joiner)
}

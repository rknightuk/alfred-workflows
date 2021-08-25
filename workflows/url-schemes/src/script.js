function run(argv)
{
    const query = argv[0]
    const app = Application.currentApplication();
        app.includeStandardAdditions = true;
        const raw = app.doShellScript('/System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/lsregister -dump URLSchemeBinding');

    let urlSchemes = raw.split('\r')
    urlSchemes.shift()
    urlSchemes = urlSchemes.map(s => {
        const data = s.split(/\s+/)
         .join(' ')
         .split('(')[0]
         .split(':')
	 
         if (!data[0]) return null

         const url = `${data[0].trim()}://`
	 
         return { 
             title: data[1].trim(),
             subtitle: url, 
             arg: url,
             text: {
                copy: url,
                largetype: url,
            }
        }
    }).filter(u => {
        if (!u) return

        if (query !== null && query !== '')
        {
            return u.title.includes(query) || u.subtitle.includes(query)
        }

        return u
    })

    return JSON.stringify({ items: urlSchemes })
}
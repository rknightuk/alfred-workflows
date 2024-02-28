// The directory to backup your workflows
const BACKUP_PATH="/Users/robb/Developer/personal/alfred-workflows"

//The directory where your Alfred workflows live
const WORKFLOW_PATH="/Users/robb/Documents/AlfredPrefs/Alfred.alfredpreferences/workflows"

//The bundle prefix you use for your workflows
const BUNDLE_PREFIX="com.rknightuk."

// The Github repository
const GITHUB_REPO="rknightuk/alfred-workflows"
const GITHUB_DOWNLOAD="https://github.com/${GITHUB_REPO}/raw/main"

// Copy the example readme into the backup readme file
const README_FILE=`${BACKUP_PATH}/readme.md`

function run(argv) {

	// todo run for one workflow
	const singleWorkflow = argv

	const app = Application.currentApplication();
	app.includeStandardAdditions = true;

	const se = Application('System Events');
	const workflows = se.folders.byName(WORKFLOW_PATH).diskItems.name()

	app.doShellScript(`cp ./readme.example ${README_FILE}`);

	let mine = []
	let others = []
	let apiData = []

	workflows.forEach(wf => {
		let data = null
		try {
			data = se.propertyListFiles.byName(`${WORKFLOW_PATH}/${wf}/info.plist`).contents.value()
		} catch (e) {
			console.log(`Cannot run for ${wf}`)
			return
		}

		if (!data) return

		let { disabled, webaddress, createdby, version, bundleid, description, name, variables, variablesdontexport, objects } = data
		if (disabled) return
		if (!version) version = '1.0.0'
		const isMine = bundleid.includes(BUNDLE_PREFIX)
		bundleid = bundleid.replace(BUNDLE_PREFIX, '')
		if (!bundleid) return

		if (isMine) {
			let currentWorkflow=`${WORKFLOW_PATH}/${wf}`
	  		formattedDescription = description ? `_${description.trim()}_ ` : null

	  		if (variables && variablesdontexport && variablesdontexport.length > 0)
	  		{
				currentWorkflow = app.doShellScript(`./overridevariables.sh ${currentWorkflow}`)
	  		}

			let hasReadme = app.doShellScript(`[ -f ${currentWorkflow}/readme.md ] && echo "true" || echo "false"`) === 'true'
			const hasScreenshot = app.doShellScript(`[ -f ${currentWorkflow}/screenshot.png ] && echo "true" || echo "false"`) === 'true'
			const hasChangelog = app.doShellScript(`[ -f ${currentWorkflow}/changelog.md ] && echo "true" || echo "false"`) === 'true'

			if (!hasReadme) {
				let keyword = null
				objects.every(o => {
					if (o.config.keyword)
					{
						keyword = o.config.keyword
						return false
					}
					return true
				})
				let contents = app.read(Path(`${BACKUP_PATH}/workflow-readme.example`))
				contents = contents.replaceAll('{{ NAME }}', name)
					.replaceAll('{{ DESC }}', description)
					.replaceAll('{{ KEYWORD }}', keyword)

					if (name === 'Workflow Development')
					{
						console.log(contents)
						console.log(keyword)
					}

				app.doShellScript(`touch ${currentWorkflow}/readme.md`)
				let newReadmeFile = app.openForAccess(Path(`${currentWorkflow}/readme.md`), { writePermission: true })
				app.setEof(newReadmeFile, { to: 0 })
				app.write(contents, { to: newReadmeFile, startingAt: app.getEof(newReadmeFile) })
				app.closeAccess(newReadmeFile)

				console.log(`Added readme for ${name}`)
				hasReadme = true
			}

		    const copyPath=`${BACKUP_PATH}/workflows/${bundleid}/${bundleid}.alfredworkflow`
		 	const link = `workflows/${bundleid}`
		 	app.doShellScript(`mkdir -p ${BACKUP_PATH}/workflows/${bundleid}/src/`)
			app.doShellScript(`cp -r ${currentWorkflow}/ ${BACKUP_PATH}/workflows/${bundleid}/src/`)
			app.doShellScript(`ditto -ck "${currentWorkflow}" "${copyPath}"`)

			if (!hasScreenshot) console.log(`⚠️ No screenshot found for ${name}`)

			if (hasReadme)
			{
				app.doShellScript(`cp "${currentWorkflow}/readme.md" "${BACKUP_PATH}/workflows/${bundleid}/readme.md"`)
			}

			let lines = [
				`### ${name}\n`,
				`${formattedDescription || ''}[Download v${version}](${link})\n`,
			]

			const wfData = {
				uid: wf.replace('user.workflow.', ''),
				bundleid: bundleid,
				name: name,
				description: description,
				version: version,
				link: `https://github.com/rknightuk/alfred-workflows/blob/main/${link}`,
				screenshot: null,
				icon: `https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/${bundleid}/src/icon.png`
			}

			if (hasScreenshot)
			{
				const screenshotPath = `https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/${bundleid}/src/screenshot.png`
				lines.push(`![${bundleid} screenshot](${screenshotPath})\n`)
				wfData.screenshot = screenshotPath
			}

			if (hasChangelog)
			{
				const changeLogContents = app.read(Path(`${BACKUP_PATH}/workflows/${bundleid}/src/changelog.md`), { usingDelimiter: '\n' })
				lines = [...lines, ...changeLogContents, '\n']
			}

			mine.push({
				name: name,
				lines: lines,
			})

			apiData.push(wfData)
		} else {
			if (createdby) {
				others.push({
					name,
					author: createdby,
					link: webaddress,
				})
			}
		}
	})

	apiData = apiData.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))
	mine = mine.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))
	others = others.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))

	app.doShellScript('touch ./api.json')
	apiData = JSON.stringify(apiData, '', 2)
	var apiFile = app.openForAccess(Path('./api.json'), { writePermission: true })
	app.setEof(apiFile, { to: 0 })
	app.write(apiData, { to: apiFile, startingAt: app.getEof(apiFile) })
	app.closeAccess(apiFile)

	mine.forEach(m => {
		m.lines.forEach(l => {
			app.doShellScript(`echo "${l}" >> ${README_FILE}`);
		})
	})

	app.doShellScript(`echo "## Third Party Workflows\n" >> ${README_FILE}`);

	others.forEach(o => {
		let text = `- ${o.name} by ${o.author}`
		if (o.link) {
			text = `- [${o.name} by ${o.author}](${o.link})`
		}

		app.doShellScript(`echo "${text}" >> ${README_FILE}`);
	})
}
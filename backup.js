// The directory to backup your workflows
const BACKUP_PATH="/Users/robb/Sites/personal/alfred-workflows"

//The directory where your Alfred workflows live
const WORKFLOW_PATH="/Users/robb/Dropbox/Alfred/Alfred.alfredpreferences/workflows"

//The bundle prefix you use for your workflows
const BUNDLE_PREFIX="com.rknightuk."

//The Github repository
const GITHUB_REPO="rknightuk/alfred-workflows"
const GITHUB_DOWNLOAD="https://github.com/${GITHUB_REPO}/raw/main"

//Copy the example readme into the backup readme file
const README_FILE=`${BACKUP_PATH}/readme.md`

function run() {
	const app = Application.currentApplication();
	app.includeStandardAdditions = true;

	const se = Application('System Events');
	const workflows = se.folders.byName(WORKFLOW_PATH).diskItems.name()

	app.doShellScript(`cp ./readme.example ${README_FILE}`);

	let mine = []
	let others = []
	let apiData = []

	workflows.forEach(wf => {
		let data = se.propertyListFiles.byName(`${WORKFLOW_PATH}/${wf}/info.plist`).contents.value()
		let { disabled, webaddress, createdby, version, bundleid, description, name, variables, variablesdontexport } = data
		if (disabled) return null
		const isMine = bundleid.includes(BUNDLE_PREFIX)
		bundleid = bundleid.replace(BUNDLE_PREFIX, '')

		if (isMine) {
			let currentWorkflow=`${WORKFLOW_PATH}/${wf}`
	  		formattedDescription = description ? `_${description.trim()}_ ` : null

	  		if (variables && variablesdontexport && variablesdontexport.length > 0)
	  		{
				currentWorkflow = app.doShellScript(`./overridevariables.sh ${currentWorkflow}`);
	  		}

		    const copyPath=`${BACKUP_PATH}/workflows/${bundleid}/${bundleid}.alfredworkflow`
		 	const link = `workflows/${bundleid}`
		 	app.doShellScript(`mkdir -p ${BACKUP_PATH}/workflows/${bundleid}/src/`)
			app.doShellScript(`cp -r ${currentWorkflow}/ ${BACKUP_PATH}/workflows/${bundleid}/src/`)
			app.doShellScript(`ditto -ck "${currentWorkflow}" "${copyPath}"`)

			const hasReadme = app.doShellScript(`[ -f ${BACKUP_PATH}/workflows/${bundleid}/src/readme.md ] && echo "true" || echo "false"`) === 'true'
			const hasScreenshot = app.doShellScript(`[ -f ${BACKUP_PATH}/workflows/${bundleid}/src/screenshot.png ] && echo "true" || echo "false"`) === 'true'
			const hasChangelog = app.doShellScript(`[ -f ${BACKUP_PATH}/workflows/${bundleid}/src/changelog.md ] && echo "true" || echo "false"`) === 'true'

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
				name: name,
				description: description,
				version: version,
				link: `https://github.com/rknightuk/alfred-workflows/blob/main/${link}`,
				screenshot: null,
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
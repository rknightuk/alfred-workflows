const workflowPath = '/Users/robb/Dropbox/Alfred/Alfred.alfredpreferences/workflows';
const se = Application('System Events');
const workflows = se.folders.byName(workflowPath).diskItems.name()

const SYMBOLS = {
	shift: '⇧',
	control: '⌃',
	option: '⌥',
	command: '⌘',
}

const KEYCOMBOS = {
	8388608: '',
	8519680: `${SYMBOLS.shift}`,
	8650752: `${SYMBOLS.control}`,
	8781824: `${SYMBOLS.shift}${SYMBOLS.control}`,
	8912896: `${SYMBOLS.option}`,
	9043968: `${SYMBOLS.shift}${SYMBOLS.option}`,
	9175040: `${SYMBOLS.control}${SYMBOLS.option}`,
	9306112: `${SYMBOLS.shift}${SYMBOLS.control}${SYMBOLS.option}`,
	9437184: `${SYMBOLS.command}`,
	9568256: `${SYMBOLS.shift}${SYMBOLS.command}`,
	9699328: `${SYMBOLS.control}${SYMBOLS.command}`,
	9830400: `${SYMBOLS.shift}${SYMBOLS.control}${SYMBOLS.command}`,
	9961472: `${SYMBOLS.option}${SYMBOLS.command}`,
	10092544: `${SYMBOLS.shift}${SYMBOLS.option}${SYMBOLS.command}`,
	10223616: `${SYMBOLS.control}${SYMBOLS.option}${SYMBOLS.command}`,
	10354688: `${SYMBOLS.shift}${SYMBOLS.control}${SYMBOLS.option}${SYMBOLS.command}`,
}

const WORDS = {
	8388608: '',
	8519680: `shift,`,
	8650752: `control`,
	8781824: `shift,control`,
	8912896: `option`,
	9043968: `shift,option`,
	9175040: `control,option`,
	9306112: `shift,control,option`,
	9437184: `command`,
	9568256: `shift,command`,
	9699328: `control,command`,
	9830400: `shift,control,command`,
	9961472: `option,command`,
	10092544: `shift,option,command`,
	10223616: `control,option,command`,
	10354688: `shift,control,option,command}`,
}

items = []

workflows.forEach(wf => {
	const data = se.propertyListFiles.byName(`${workflowPath}/${wf}/info.plist`).contents.value()
	if (data.disabled) return null
	const { 
		name, 
		description, 
		createdby, 
		version, 
		webaddress, 
		readme, 
		disabled, 
		bundleid
	} = data

	const objects = data['objects'] || []

	let hotKeyConfig = objects.filter(o => o.type === 'alfred.workflow.trigger.hotkey')
	if (hotKeyConfig.length === 0) return null
	hotKeyConfig.forEach(hk => {
		const { config } = hk
		const { hotkey, hotmod, hotstring } = config

		if (hotkey === 0 || !hotstring) return

		hotkey + ' ' + hotmod + ' ' + hotstring + ' ' + name
		const comboKey = `${KEYCOMBOS[hotmod] ? `${KEYCOMBOS[hotmod]}` : ''}`
		let comboWords = (`${WORDS[hotmod] ? `${WORDS[hotmod]}` : ''}`)
		if (comboWords !== '')
		{
			comboWords = comboWords.split(',').map(cw => `${cw} down`).join(', ')
		}

		items.push({
			uid: `${bundleid}${hotkey}${hotmod}`,
			title: `${comboKey}${hotstring}: ${name}`,
			arg: `${hotkey}:${comboWords}`,
			icon: {
				path: `${workflowPath}/${wf}/icon.png`,
			}
		})
	})
})

JSON.stringify({ items: items })
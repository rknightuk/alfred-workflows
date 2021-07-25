function run(argv) {
	const input = argv.map(a => `${a} `).join('').trim()

	const types = {
		lower: { fn: (string) => string.toLowerCase(), name: 'lower case' },
		upper: { fn: (string) => string.toUpperCase(), name: 'UPPER CASE' },
		sentence: { fn: (string) => string.charAt(0).toUpperCase() + string.slice(1), name: 'Sentence case' },
		title: { fn: (string) => {
			return string.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
		}, name: 'Title Case' },
		camel: { fn: (string) => {
			return string.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
		}, name: 'CamelCase' },
		snake: { fn: (string) => string.split(' ').join('_').split('-').join('_'), name: 'snake_case' },
		kebab: { fn: (string) => string.split(' ').join('-').split('_').join('-'), name: 'kebab-case' },
		spongebob: { fn: (string) => {
			let output = ''
		    string.split('').forEach((l, i) => {
		        output += i % 2 === 0 ? l.toLowerCase() : l.toUpperCase()
		    })
		    return output
		}, name: 'sPoNgEbOb cAsE'},
		reverse: { fn: (string) => {
			let output = ''
		    string.split('').forEach(l => {
		        output = `${l}${output}`
		    })
		    return output
		}, name: 'esrever' },
	}

	values = Object.keys(types).map(k => {
		const output = types[k].fn(input)
		return { title: output, arg: output, icon: { path: `./icons/${k}.png`} }
	})

	// values.unshift({
	// 	title: input ? 'Process with TextBuddy' : 'Process clipboard with TextBuddy',
	// 	arg: 'TEXTBUDDY',
	// })
	
	return JSON.stringify({ items: values })


}
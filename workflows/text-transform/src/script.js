// title case code from https://github.com/blakeembrey/change-case/blob/master/packages/title-case/src/index.ts
titleCase = (string) => {
  const SMALL_WORDS =
    /\b(?:an?d?|a[st]|because|but|by|en|for|i[fn]|neither|nor|o[fnr]|only|over|per|so|some|tha[tn]|the|to|up|upon|vs?\.?|versus|via|when|with|without|yet)\b/i;
  const TOKENS = /[^\s:–—-]+|./g;
  const WHITESPACE = /\s/;
  const IS_MANUAL_CASE = /.(?=[A-Z]|\..)/;
  const ALPHANUMERIC_PATTERN = /[A-Za-z0-9\u00C0-\u00FF]/;

  let result = "";
  let m;

  while ((m = TOKENS.exec(string)) !== null) {
    const { 0: token, index } = m;

    if (
      // Ignore already capitalized words.
      !IS_MANUAL_CASE.test(token) &&
      // Ignore small words except at beginning or end.
      (!SMALL_WORDS.test(token) ||
        index === 0 ||
        index + token.length === string.length) &&
      // Ignore URLs.
      (string.charAt(index + token.length) !== ":" ||
        WHITESPACE.test(string.charAt(index + token.length + 1)))
    ) {
      // Find and uppercase first word character, skips over *modifiers*.
      result += token.replace(ALPHANUMERIC_PATTERN, (m) => m.toUpperCase());
      continue;
    }

    result += token;
  }

  return result;
};

function run(argv) {
	const showTextBuddy = argv[0] === 'true'

	argv[0] = ''
	const input = argv.map(a => `${a} `).join('').trim()

	const types = {
		lower: { fn: (string) => string.toLowerCase(), name: 'lower case' },
		upper: { fn: (string) => string.toUpperCase(), name: 'UPPER CASE' },
		sentence: { fn: (string) => string.charAt(0).toUpperCase() + string.slice(1), name: 'Sentence case' },
		title: { fn: (string) => titleCase(string) },
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

	if (showTextBuddy)
	{
		values.unshift({
			title: input ? 'Process with TextBuddy' : 'Process clipboard with TextBuddy',
			arg: `TXBDDY${input ? 'P' : 'C'}${input}`,
		})
	}
	
	return JSON.stringify({ items: values })

}
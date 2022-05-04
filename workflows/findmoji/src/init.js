// this is just here for reference and isn't used in the workflow

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
}

function run(argv) {
    return
	const query = argv[0]

	const app = Application.currentApplication();
	app.includeStandardAdditions = true;
    ObjC.import('stdlib');

    const request = `curl https://raw.githubusercontent.com/iamcal/emoji-data/master/emoji.json`
	const emoji = JSON.parse(app.doShellScript(request))

	const items = emoji.map((e) => {
		let unicodes = e.unified.split('-')
  		let codePoints = unicodes.map((u) => `0x${u}`)

		const nativeEmoji = String.fromCodePoint(...codePoints)

        return {
          uid: e.unified,
            title: nativeEmoji,
            subtitle: titleCase(e.name.toLowerCase()),
			      match: e.name.toLowerCase(),
            arg: nativeEmoji,
            icon: {
              path: 'icons/' + e.image,
            }
        }
    })

    return JSON.stringify({ items })
}
function run(argv) {

	const query = argv[0]
	ObjC.import('stdlib');
	const includeReplies = $.getenv('include_replies') === 'true'
	const includeRetweets = $.getenv('include_retweets') === 'true'
	const archivePath = $.getenv('archive_path')

	if (!archivePath)
	{
		return JSON.stringify({ items: [
			{
				title: 'No archive path found',
			}
		]})
	}

	if (query.length < 3)
	{
		return JSON.stringify({ items: [
			{
				title: 'Search query must be a minimum of 3 characters',
			}
		]})
	}

	ObjC.import('Foundation');
	var fm = $.NSFileManager.defaultManager;
	var contents = fm.contentsAtPath(archivePath.toString());
	contents = $.NSString.alloc.initWithDataEncoding(contents, $.NSUTF8StringEncoding);

	const tweets = JSON.parse(ObjC.unwrap(contents).replace('window.YTD.tweet.part0 = ', ''))

	const items = tweets.filter(t => {
		if (!includeReplies && t.tweet.in_reply_to_user_id) return false
		if (!includeRetweets && t.tweet.full_text.startsWith('RT @')) return false
		return !query || t.tweet.full_text.toLowerCase().includes(query.toLowerCase())
	}).map(t => {
		const start = new Date(t.tweet.created_at)
		const startHours = start.getHours() < 10 ? `0${start.getHours()}` : start.getHours();
		const startMinutes = start.getMinutes() < 10 ? `0${start.getMinutes()}` : start.getMinutes();
		const startDate = start.getDate() < 10 ? `0${start.getDate()}` : start.getDate();
		const startMonth = (start.getMonth() + 1) < 10 ? `0${(start.getMonth() + 1)}` : start.getMonth() + 1;
		const startDateString = `${start.getFullYear()}-${startMonth}-${startDate} ${startHours}:${startMinutes}`
		let tweetText = t.tweet.full_text.replace(/\r?\n/g, " ")

		const url = `https://twitter.com/_/status/${t.tweet.id}`
		let icon = 'tweet'
		if (t.tweet.in_reply_to_user_id) icon = 'reply'
		if (t.tweet.full_text.startsWith('RT @')) {
			icon = 'retweet'
			tweetText = tweetText.replace('RT ', '')
		}

		const favCount = parseInt(t.tweet.favorite_count, 10)
		const retweetCount = parseInt(t.tweet.retweet_count, 10)
		let subtitle = startDateString
		if (retweetCount > 0)
		{
			subtitle += ` • ${retweetCount} retweet${retweetCount > 1 ? 's' : ''}`
		}
		if (favCount > 0)
		{
			subtitle += ` • ${favCount} fave${favCount > 1 ? 's' : ''}`
		}

		return {
			title: tweetText,
			subtitle,
			arg: url,
			icon: {
				path: `icons/${icon}.png`,
			},
			text: {
			    copy: url,
			    largetype: tweetText,
			}
		}
	}).sort((a,b) => (a.subtitle < b.subtitle) ? 1 : ((b.subtitle < a.subtitle) ? -1 : 0))

	if (items.length === 0)
	{
		return JSON.stringify({ items: [
			{
				title: 'No results found',
			}
		]})	
	}

	return JSON.stringify({ items: items })
}
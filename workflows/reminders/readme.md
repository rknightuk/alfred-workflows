## Reminders Alfred Workflow

[Download Reminders for Alfred](https://github.com/rknightuk/alfred-workflows/raw/main/workflows/reminders/reminders.alfredworkflow)

The CLI is based on a modified version of [keith/reminders-cli](https://github.com/keith/reminders-cli) and a modified version of date parsing code from [surrealroad/alfred-reminders](https://github.com/surrealroad/alfred-reminders).

### What does it do?

This workflow allows you to:

- View upcoming reminders (either all of them or for a specific list)
- Create new reminders for either your default list (set the variable on install) or for a specific list (`rmind` > Lists > Choose List > Create New Reminder)

Keyword is `rmind`

### Why is the download so large?

I'm including the Swift CLI tool with the workflow because there's no good reason to publish it separately: it outputs the reminders in such a way to only useful for this workflow.


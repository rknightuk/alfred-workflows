# My Alfred Workflows

[Alfred workflows](https://www.alfredapp.com/workflows/) I've made, ones that I use, and a script to automatically export mine.

Icons from [Feather Icons](https://feathericons.com)

Like these workflows? [Buy me a coffee](https://monzo.me/robbknight)

The theme in the screenshots is [Tempo Alternative (Dark)](https://github.com/chrismessina/alfred-theme-tempo#tempo-alternative-dark) by [Chris Messina](https://github.com/chrismessina).

## Setting up the backup script

[`backup.js`](backup.js) generates this readme file as well as backing up my workflows (and only mine, don't post other peoples workflows to your own repositories). The script works by doing the following:

- Looping through all workflows in my Alfred workflow directory
- If it has my bundle ID in the plist file, it extracts the metadata using `PListBuddy`, adds it to the first list below, then zips the workflow as an `.alfredworkflow`
- If it doesn't have my bundle ID, then it gets the name, author and website and puts them in the second list below

See the comments in the script to set this up for your own workflows

This part of the readme is set in `readme.example`

## My Workflows

_Some of these will completely useless to anyone but me_ 

### App Mode

_Open apps for different scenarios_ [Download v1.0.0](workflows/computer-mode)

![computer-mode screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/computer-mode/src/screenshot.png)

### Audio Device Selector

_Select and switch audio devices_ [Download v1.0.0](workflows/audio-device-selector)

![audio-device-selector screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/audio-device-selector/src/screenshot.png)

### Calendar Events

_View and create calendar events_ [Download v1.3.0](workflows/calendar-events)

![calendar-events screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/calendar-events/src/screenshot.png)

- [2021-07-23] Faster overall, showing reminders is now controlled by a variable
- [2021-07-22] Moved scripts to JXA for easier changes
- [2021-07-22] If Reminders workflow is installed, it can now be opened from Calendar Events


### Common Folders

_Open commonly used folders_ [Download v1.0.0](workflows/common-folders)

### Finder to Terminal

_Open the current finder window in Terminal_ [Download v1.0.0](workflows/finder-to-terminal)

### Get Safari Tabs

_Copy all current Safari tabs to Markdown_ [Download v1.0.0](workflows/safari-tabs-markdown)

### Hotkey List

_List all workflows assigned to a hotkey_ [Download v1.0.2](workflows/hotkey-list)

![hotkey-list screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/hotkey-list/src/screenshot.png)

- [2021-07-22] Hotkeys with modifiers now run through a hacky method
- [2021-07-22] Now shows hotkeys including modifiers but these don't work yet, see https://www.alfredforum.com/topic/17130-format-for-running-key-combo-from-input-with-function-keys-and-modifiers/


### Jump List

_ZSH Jump list plugin in Alfred_ [Download v1.0.0](workflows/jump-list)

![jump-list screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/jump-list/src/screenshot.png)

### Monzo Link Generator

_Generate Monzo.me Link_ [Download v1.0.0](workflows/monzo-link-generator)

![monzo-link-generator screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/monzo-link-generator/src/screenshot.png)

### Paste Plain Text

[Download v1.0.0](workflows/paste-plain-text)

### Reminders

_View and create reminders_ [Download v1.4.0](workflows/reminders)

![reminders screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/reminders/src/screenshot.png)

- [2021-07-25] Use alt to open a reminder in Reminders app
- [2021-07-23] Faster overall, showing calendars is now controlled by a variable
- [2021-07-22] Workflow will now auto-update
- [2021-07-22] Moved scripts to JXA for easier changes
- [2021-07-22] If Calendar Events workflow is installed, it can now be opened from Reminders


### Shortcuts

_Run Shortcuts_ [Download v1.0.0](workflows/shortcuts)

![shortcuts screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/shortcuts/src/screenshot.png)

### Text Transform

_Transform text in various ways or process with TextBuddy (optional)_ [Download v1.1.1](workflows/text-transform)

![text-transform screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/text-transform/src/screenshot.png)

### Toggle Audio Output

_Switch audio output between MBP and Monitor_ [Download v1.0.0](workflows/toggle-audio)

### Toggle Dark Mode

_Toggle Dark/Light Mode_ [Download v1.0.0](workflows/toggle-dark-mode)

### Toggle Microphone

_Mute/Unmute microphone input_ [Download v1.0.0](workflows/toggle-microphone)

### Toggle Music

_Play/Pause Apple Music with hotkey_ [Download v1.0.0](workflows/toggle-music)

### Toggle Wifi

_Toggle Wifi on/off_ [Download v1.0.0](workflows/toggle-wifi)

### Workflow Dev

_Open a workflow's files in Sublime Text, Finder, or Terminal_ [Download v1.1.0](workflows/workflow-dev)

![workflow-dev screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/workflow-dev/src/screenshot.png)

- [2021-07-23] Now shows options to option in Finder, Sublime, Terminal, or All


## Third Party Workflows

- [Amphetamine4 Switch by ShisaQ](https://shisaq.github.io)
- [Datetime Format Converter by Michael Waterfall](twitter.com/mwaterfall)
- [Emoji Taco by Jeff Stein](https://github.com/jeeftor/EmojiTaco)
- [fkill by Sam Verschueren](https://github.com/SamVerschueren/alfred-fkill#readme)
- [HTTP Status Code by Fred Liang](https://github.com/ilstar/http_status_code)
- [IP Address v1.2.0 by David Ferguson](jdfwarrior.tumblr.com)
- [JetBrains - Open Project - v3 by bchatard](https://github.com/bchatard/alfred-jetbrains#readme)
- [JustWatch - Alfred by VWAP](https://twitter.com/vinayw)
- [LinkClean by Vítor Galvão](http://vitorgalvao.com/)
- [Lorem Ipsum by Till Krüss](https://till.im)
- [Pocket for Alfred by Fabio Niephaus](https://github.com/fniephaus/alfred-pocket/)
- [Search Notes.app by Sean Ballinger](https://github.com/sballin/alfred-search-notes-app)
- [SoulverCore by Carlos Precioso](https://precioso.design/)
- [Speedtest by Michael Mroczka](http://michaelmroczka.com/)
- [TablePlus by Chris Renga](https://www.chrisrenga.com)
- [VPN Connections by Jacob Helwig](https://technosorcery.net)

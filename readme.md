# My Alfred Workflows

[https://rknight.me/alfred-workflows/](https://rknight.me/alfred-workflows/)

[Alfred workflows](https://www.alfredapp.com/workflows/) I've made, ones that I use, and a script to automatically export mine.

Icons from [Feather Icons](https://feathericons.com)

Like these workflows? [Buy me a coffee](https://www.buymeacoffee.com/rknightuk)

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

### Agenda - Reminders and Calendar Events

_Manage Reminders and Calandar Events_ [Download v1.0.1](workflows/agenda)

![agenda screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/agenda/src/screenshot.png)

### App Mode

_Open apps for different scenarios_ [Download v1.0.0](workflows/computer-mode)

![computer-mode screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/computer-mode/src/screenshot.png)

### Audio Device Selector

_Select and switch audio devices_ [Download v1.0.0](workflows/audio-device-selector)

![audio-device-selector screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/audio-device-selector/src/screenshot.png)

### Carbon Code

_Send clipboard contents to carbon.now.sh to generate an image_ [Download v1.0.0](workflows/carbonnowsh)

![carbonnowsh screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/carbonnowsh/src/screenshot.png)

### Common Folders

_Open commonly used folders_ [Download v1.0.0](workflows/common-folders)

### Fathom Analytics

_View current visitors for your sites_ [Download v1.0.2](workflows/fathom-analytics)

![fathom-analytics screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/fathom-analytics/src/screenshot.png)

### File Actions

_Open folders and files in an editor, Finder, or Terminal_ [Download v1.0.0](workflows/folder-actions)

![folder-actions screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/folder-actions/src/screenshot.png)

- [2021-07-23] Now shows options to option in Finder, Sublime, Terminal, or All


### Finder to Terminal

_Open the current finder window in Terminal_ [Download v1.0.0](workflows/finder-to-terminal)

### Findmoji

_Find and paste emoji_ [Download v1.0.0](workflows/findmoji)

![findmoji screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/findmoji/src/screenshot.png)

### Get Safari Tabs

_Copy all current Safari tabs to Markdown_ [Download v1.2.2](workflows/safari-tabs-markdown)

![safari-tabs-markdown screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/safari-tabs-markdown/src/screenshot.png)

### Hotkey List

_List all workflows assigned to a hotkey_ [Download v1.0.2](workflows/hotkey-list)

![hotkey-list screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/hotkey-list/src/screenshot.png)

- [2021-07-22] Hotkeys with modifiers now run through a hacky method
- [2021-07-22] Now shows hotkeys including modifiers but these don't work yet, see https://www.alfredforum.com/topic/17130-format-for-running-key-combo-from-input-with-function-keys-and-modifiers/


### Intersect

_Workflow for searching the Intersect_ [Download v1.0.0](workflows/intersect)

![intersect screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/intersect/src/screenshot.png)

### Jump List

_ZSH Jump list plugin in Alfred_ [Download v1.0.0](workflows/jump-list)

![jump-list screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/jump-list/src/screenshot.png)

### Monzo Link Generator

_Generate Monzo.me Link_ [Download v1.0.0](workflows/monzo-link-generator)

![monzo-link-generator screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/monzo-link-generator/src/screenshot.png)

### New File in Finder

_Create a new file in the current Finder window_ [Download v1.0.0](workflows/new-file-in-finder)

### Project Development

_Open a projects folder in an editor, Finder, or Terminal_ [Download v1.0.0](workflows/projects-dev)

![projects-dev screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/projects-dev/src/screenshot.png)

- [2021-07-23] Now shows options to option in Finder, Sublime, Terminal, or All


### Search This Site

_Universal URL action to search the selected site_ [Download v1.0.0](workflows/search-this-site)

### Shortcuts

_Run Shortcuts_ [Download v1.0.0](workflows/shortcuts)

![shortcuts screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/shortcuts/src/screenshot.png)

### TablePlus

_A TablePlus connection workflow_ [Download v1.0](workflows/table-plus)

![table-plus screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/table-plus/src/screenshot.png)

### Text Transform

_Transform text in various ways or process with TextBuddy (optional)_ [Download v1.1.1](workflows/text-transform)

![text-transform screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/text-transform/src/screenshot.png)

### Toggle Tunnelblick VPN

_Toggle a single Tunnelblick VPN connection_ [Download v1.0.0](workflows/toggle-tunnelblick-vpn)

![toggle-tunnelblick-vpn screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/toggle-tunnelblick-vpn/src/screenshot.png)

### Toggle Utils

_Toggle Wifi, Bluetooth, Music, and More_ [Download v1.0.0](workflows/toggle-utils)

![toggle-utils screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/toggle-utils/src/screenshot.png)

### TrackerZapper

_Removes tracking parameters from links_ [Download v1.0.0](workflows/trackerzapper)

![trackerzapper screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/trackerzapper/src/screenshot.png)

### Twitter Archive Search

_Search your local Twitter archive_ [Download v1.0.1](workflows/twitter-archive-search)

![twitter-archive-search screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/twitter-archive-search/src/screenshot.png)

### URL Schemes

_Show all URL schemes for installed apps_ [Download v1.0.0](workflows/url-schemes)

![url-schemes screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/url-schemes/src/screenshot.png)

### Workflow Development

_Open a workflow's files in an editor, Finder, or Terminal_ [Download v1.1.0](workflows/workflow-dev)

![workflow-dev screenshot](https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/workflows/workflow-dev/src/screenshot.png)

- [2021-07-23] Now shows options to option in Finder, Sublime, Terminal, or All


## Third Party Workflows

- [AlForge by Vince Mitchell](https://github.com/vmitchell85/alforge)
- [Amphetamine4 Switch by ShisaQ](https://shisaq.github.io)
- [CleanShot by Mr. Pennyworth](https://github.com/mr-pennyworth/alfred-cleanshot#readme)
- [Datetime Format Converter by Michael Waterfall](twitter.com/mwaterfall)
- [fkill by Sam Verschueren](https://github.com/SamVerschueren/alfred-fkill#readme)
- [HTTP Status Code by Fred Liang](https://github.com/ilstar/http_status_code)
- [IP Address v1.2.0 by David Ferguson](jdfwarrior.tumblr.com)
- [JetBrains - Open Project - v3 by bchatard](https://github.com/bchatard/alfred-jetbrains#readme)
- [Lorem Ipsum by Till Kr??ss](https://till.im)
- [Pocket for Alfred by Fabio Niephaus](https://github.com/fniephaus/alfred-pocket/) [[My Fork](https://github.com/rknightuk/alfred-pocket)]
- [Search Notes by Sean Ballinger](https://github.com/sballin/alfred-search-notes-app)
- [song.link by Lari Kovanen](http://kovanen.se/)
- [SoulverCore by Carlos Precioso](https://precioso.design/)
- [Speedtest by Michael Mroczka](http://michaelmroczka.com/)
- [Temp Conversion by Justin Hamilton](https://www.jwhamilton.co)

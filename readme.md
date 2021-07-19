# My Alfred Workflows

[Alfred workflows](https://www.alfredapp.com/workflows/) I've made, ones that I use, and a script to automatically export mine.

Icons from [Feather Icons](https://feathericons.com)

## Setting up the backup script

[`backup.sh`](backup.sh) generates this readme file as well as backing up my workflows (and only mine, don't post other peoples workflows to your own repositories). The script works by doing the following:

- Looping through all workflows in my Alfred workflow directory
- If it has my bundle ID in the plist file, it extracts the metadata using `PListBuddy`, adds it to the first list below, then zips the workflow as an `.alfredworkflow`
- If it doesn't have my bundle ID, then it gets the name, author and website and puts them in the second list below

See the comments in the script to set this up for your own workflows

This part of the readme is set in `readme.example`

## My Workflows

 _Some of these will completely useless to anyone but me_ 


- [Monzo Link Generator - _Generate a Monzo.me link_](https://github.com/rknightuk/alfred-workflows/raw/main/workflows/monzo-link-generator.alfredworkflow) `v1.0.0` 
- [Toggle Microphone - _Mute/Unmute microphone input_](https://github.com/rknightuk/alfred-workflows/raw/main/workflows/toggle-microphone.alfredworkflow) `v1.0.0` 
- [Hotkey List - _List all workflows assigned to a hotkey_](https://github.com/rknightuk/alfred-workflows/raw/main/workflows/hotkey-list.alfredworkflow) `v1.0.0` 
- [Reminders - _View and create reminders_](workflows/reminders) `v1.0.0` 
- [Jump List - _ZSH Jump list plugin in Alfred_](https://github.com/rknightuk/alfred-workflows/raw/main/workflows/jump-list.alfredworkflow) `v1.0.0` 
- [Toggle Wifi - _Toggle Wifi on/off_](https://github.com/rknightuk/alfred-workflows/raw/main/workflows/toggle-wifi.alfredworkflow) `v1.0.0` 
- [Common Folders - _Open commonly used folders_](https://github.com/rknightuk/alfred-workflows/raw/main/workflows/common-folders.alfredworkflow) `v1.0.0` 
- [Toggle Music - _Play/Pause Apple Music with hotkey_](https://github.com/rknightuk/alfred-workflows/raw/main/workflows/toggle-music.alfredworkflow) `v1.0.0` 
- [Workflow Dev - _Open a workflows files in Sublime Text_](https://github.com/rknightuk/alfred-workflows/raw/main/workflows/workflow-dev.alfredworkflow) `v1.0.0` 
- [Toggle Dark Mode - _Toggle Dark/Light Mode_](https://github.com/rknightuk/alfred-workflows/raw/main/workflows/toggle-dark-mode.alfredworkflow) `v1.0.0` 
- [Toggle Audio Output - _Switch audio output between MBP and Monitor_](https://github.com/rknightuk/alfred-workflows/raw/main/workflows/toggle-audio.alfredworkflow) `v1.0.0` 
- [App Mode - _Open apps for different scenarios_](https://github.com/rknightuk/alfred-workflows/raw/main/workflows/computer-mode.alfredworkflow) `v1.0.0` 

## Third Party Workflows

- [VPN Connections by Jacob Helwig](https://technosorcery.net) 
- [HTTP Status Code by Fred Liang](https://github.com/ilstar/http_status_code) 
- [Emoji Taco by Jeff Stein](https://github.com/jeeftor/EmojiTaco) 
- [Datetime Format Converter by Michael Waterfall](twitter.com/mwaterfall) 
- [Search Notes.app by Sean Ballinger](https://github.com/sballin/alfred-search-notes-app) 
- [Speedtest by Michael Mroczka](http://michaelmroczka.com/) 
- [TablePlus by Chris Renga](https://www.chrisrenga.com) 
- [Amphetamine4 Switch by ShisaQ](https://shisaq.github.io) 
- [JustWatch - Alfred by VWAP](https://twitter.com/vinayw) 
- [Pocket for Alfred by Fabio Niephaus](https://github.com/fniephaus/alfred-pocket/) 
- [Lorem Ipsum by Till Krüss](https://till.im) 
- [IP Address v1.2.0 by David Ferguson](jdfwarrior.tumblr.com) 


# Worklog Reminder for JIRA

<img src="./static/appIconColored.png" height="64" align="left"/>
App for tracking time and search JIRA issues
<br/><br/>

<a href="https://circleci.com/gh/Doka-NT/worklog-reminder/tree/main"><img src="https://circleci.com/gh/Doka-NT/worklog-reminder/tree/main.svg?style=svg"/></a>
<a href="https://www.codefactor.io/repository/github/doka-nt/worklog-reminder"><img src="https://www.codefactor.io/repository/github/doka-nt/worklog-reminder/badge" alt="CodeFactor" /></a>
<a href="https://codeclimate.com/github/Doka-NT/worklog-reminder/maintainability"><img src="https://api.codeclimate.com/v1/badges/b4adc73b9d1510cddb63/maintainability" /></a>
<br/>

## Main features

- 2 click to log your time
- Quick issue search
- Scheduled worklog reminder notifications
- Cross-platform (MacOS, Windows, Linux)
- Completely FREE

## Download
<a href="https://github.com/Doka-NT/worklog-reminder/releases/latest/download/worklog-reminder.dmg"><img src="./docs/images/btn-mac.png" height="35"/></a>
<a href="https://github.com/Doka-NT/worklog-reminder/releases/latest/download/Worklog.Reminder.Setup.exe"><img src="./docs/images/btn-win.png" height="35"/></a>
<a href="https://github.com/Doka-NT/worklog-reminder/releases/latest/download/worklog-reminder.amd64.deb"><img src="./docs/images/btn-linux.png" height="35"/></a>

[Other download options](https://github.com/Doka-NT/worklog-reminder/releases/latest)

## Overview

<img src="./docs/images/welcome-screen.gif" height="250" align="left"/>

### Easy setup

Setup **Worklog Reminder** in 4 simple steps:

  • Provide your JIRA URL<br/>
  • Enter your username<br/>
  • Create or paste API token<br/>
  • Done!</br>

<br/><br/><br/><br/>

<img src="./docs/images/issues-screen.gif" height="250" align="left"/>

### Easy to use

Work with issues in 2 clicks:

  • Look through last viewed<br/>
  • Search for issues<br/>
  • Open issues in browser<br/>
  • Click on issue and choose time<br/>
  • Optionaly: provide a comment<br/>
  • Done!<br/>
  
<br/>

## Main Features

- You need only 2 clicks to track time
- Search through last viewed issues
- Tray based application
- Minimalistic interface
- Schedule interval notifications as you want (1, 2, 3, .., 60 minutes and etc)
- Auto update issue list in background
- Electron based application works on every desktop platform: Windows, Linux and MacOS

## Development

### Requirements

- NodeJS >= 12
- Yarn

### Install

```bash
git clone git@github.com:Doka-NT/worklog-reminder.git
cd worklog-reminder
yarn
yarn start
```

### Compile ready-to-use app

To create ready-to-use application run the following command

```bash
yarn make
```

After that go to the `out/make` directory and find a version for your platform

## Support

If you have any question feel free to [create new issue](https://github.com/Doka-NT/worklog-reminder/issues/new)

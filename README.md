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

<table border="0">
  <tr>
    <td align="left">
      <a href="https://github.com/Doka-NT/worklog-reminder/releases/latest/download/worklog-reminder.dmg">
        <img src="./docs/images/btn-mac.png" height="35"/>
      </a>
    </td>
    <td>
      <a href="https://github.com/Doka-NT/worklog-reminder/releases/latest/download/Worklog.Reminder.Setup.exe">
        <img src="./docs/images/btn-win.png" height="35"/>
      </a>
    </td>
    <td>
      <a href="https://github.com/Doka-NT/worklog-reminder/releases/latest/download/worklog-reminder.amd64.deb">
        <img src="./docs/images/btn-linux.png" height="35"/>
      </a>
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <a href="https://github.com/Doka-NT/worklog-reminder/releases/latest/">See all available download options</a>
    </td>
  </tr>
</table>

## Overview

### Easy setup

Setup **Worklog Reminder** in 4 simple steps:

<ul>
  <li>Provide your JIRA URL</li>
  <li>Enter your username</li>
  <li>Create or paste API token</li>
  <li>Done!</li>
</ul>
<img src="./docs/images/welcome-screen.gif" height="250"/>

### Easy to use

Work with issues in 2 clicks:

<ul>
  <li>Look through last viewed</li>
  <li>Search for issues</li>
  <li>Open issues in browser</li>
  <li>Click on issue and choose time</li>
  <li>Optionaly: provide a comment</li>
  <li>Done!</li>
</ul>
<img src="./docs/images/issues-screen.gif" height="250"/>

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

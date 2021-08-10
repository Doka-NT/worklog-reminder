[![CircleCI](https://circleci.com/gh/Doka-NT/worklog-reminder/tree/main.svg?style=svg)](https://circleci.com/gh/Doka-NT/worklog-reminder/tree/main)

# Worklog Reminder

<a href="./docs/images/screenshot-picker.png"><img src="./docs/images/screenshot-picker.png" height="100"/></a>
<a href="./docs/images/screenshot-comment.png"><img src="./docs/images/screenshot-comment.png" height="100"/></a>
<a href="./docs/images/screenshot-settings.png"><img src="./docs/images/screenshot-settings.png" height="100"/></a>

This app will help you with:

- Watch through your last issues
- Track time in 1-2 clicks
- Schedule notifications

## Main Features
- You need only 2 clicks to track time
- Search through last viewed issues
- Tray based application
- Minimalistic interface
- Schedule interval notifications as you want (1, 2, 3, .., 60 minutes and etc)
- Electron based application works on every desktop platform: Windows, Linux and MacOS

## Installation

### Requirements
- NodeJS >= 12
- Yarn
- Git (optional). You also can [download zip](https://github.com/Doka-NT/worklog-reminder/archive/refs/heads/main.zip)

### Install via git
```bash
git clone git@github.com:Doka-NT/worklog-reminder.git && cd worklog-reminder && yarn
```

### Compile ready-to-use app
To create ready-to-use application run the following command

#### Windows
```bash
yarn make -p win32
```

#### Linux
```bash
yarn make -p linux
```

#### MacOs
```bash
yarn make -p mas
```

After that go to the `out/make` directory and find a version for you platform

### Run in dev mode

```bash
yarn start
```

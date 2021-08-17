const path = require('path')

module.exports = {
    packagerConfig: {
        icon: path.join(__dirname, 'static', 'appIconColored'),
    },
    plugins: [
        ['@electron-forge/plugin-webpack', {
            mainConfig: './webpack.main.config.js',
            renderer: {
                config: './webpack.renderer.config.js',
                entryPoints: [{
                    name: 'main_window',
                    html: './src/Application/Renderer/index.html',
                    js: './src/Application/Renderer/renderer.js'
                }]
            },
            devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://*.atlassian.net`,
        }]
    ],
    makers: [
        {
            name: '@electron-forge/maker-dmg',
            config: {
                background: path.join(__dirname, 'static', 'dmgBackground.jpg'),
                icon: path.join(__dirname, 'static', 'appIconColored.png'),
                iconSize: 128,
            }
        },
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                name: 'WorklogReminder',
                icon: path.join(__dirname, 'static', 'appIconColored.ico'),
                loadingGif: path.join(__dirname, 'static', 'spinner.gif'),
                setupIcon: path.join(__dirname, 'static', 'appIconColored.ico'),
            }
        },
        {
            name: '@electron-forge/maker-deb',
            config: {
                options: {
                    maintainer: 'Soshnikov Artem',
                    homepage: 'https://github.com/Doka-NT/worklog-reminder',
                    categories: ['Utility'],
                    section: ['utils', 'javascript'],
                    genericName: 'Worklog Reminder',
                    icon: path.join(__dirname, 'static', 'appIconColored.png'),
                    productName: 'Worklog Reminder',
                    productDescription: "This app will help you with\n - Watch through your last viewed JIRA issues\n - Track time in 1-2 clicks. Optionally provide a comment\n - Schedule notifications to keep worklog actual",
                }
            }
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {
                options: {
                    maintainer: 'Soshnikov Artem',
                    homepage: 'https://github.com/Doka-NT/worklog-reminder',
                    categories: ['Utility'],
                    genericName: 'Worklog Reminder',
                    description: "App to simplify work with worklogs in JIRA",
                    icon: path.join(__dirname, 'static', 'appIconColored.png'),
                    productName: 'Worklog Reminder',
                    productDescription: "This app will help you with\n - Watch through your last viewed JIRA issues\n - Track time in 1-2 clicks. Optionally provide a comment\n - Schedule notifications to keep worklog actual",
                }
            }
        },
        {
            name: '@electron-forge/maker-zip'
        }
    ],
}

const path = require('path')

module.exports = {
    packagerConfig: {
        icon: path.join(__dirname, 'static', 'appIcon'),
    },
    makers: [
        {
            name: '@electron-forge/maker-dmg',
        },
        {
            name: '@electron-forge/maker-squirrel',
        },
        {
            name: '@electron-forge/maker-deb',
            config: {
                options: {
                    maintainer: 'Soshnikov Artem',
                    homepage: 'https://github.com/Doka-NT/worklog-reminder'
                }
            }
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {
                options: {
                    maintainer: 'Soshnikov Artem',
                    homepage: 'https://github.com/Doka-NT/worklog-reminder'
                }
            }
        },
        {
            name: '@electron-forge/maker-zip'
        }
    ],
    plugins: [
        ['@electron-forge/plugin-webpack', {
            mainConfig: './webpack.main.config.js',
            renderer: {
                config: './webpack.renderer.config.js',
                entryPoints: [{
                    name: 'main_window',
                    html: './src/index.html',
                    js: './src/renderer.js'
                }]
            },
            devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://*.atlassian.net`,
        }]
    ]
}

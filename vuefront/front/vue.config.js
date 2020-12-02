module.exports = {
    pages:{
        'index':{
            entry: './src/pages/index/main.js',
            template: 'public/index.html',
            title: 'INICIO',
            chunks: ['chunk-vendors','chunk-common', 'index']
        },
        'registro':{
            entry: './src/pages/in/main.js',
            template: 'public/index.html',
            title: 'REGISTRO',
            chunks: ['chunk-vendors','chunk-common', 'registro']
        },
        'lecturas':{
            entry: './src/pages/log/main.js',
            template: 'public/index.html',
            title: 'LECTURAS',
            chunks: ['chunk-vendors','chunk-common', 'lecturas']
        },
        'Changepassword':{
            entry: './src/pages/Changepassword/main.js',
            template: 'public/index.html',
            title: 'Change password',
            chunks: ['chunk-vendors','chunk-common', 'Changepassword']
        },
        'ChangeProfile':{
            entry: './src/pages/ChangeProfile/main.js',
            template: 'public/index.html',
            title: 'Change Profile',
            chunks: ['chunk-vendors','chunk-common', 'ChangeProfile']
        },
        'DataDate':{
            entry: './src/pages/DataDate/main.js',
            template: 'public/index.html',
            title: 'Data',
            chunks: ['chunk-vendors','chunk-common', 'DataDate']
        },
        'consumptionLEDS':{
            entry: './src/pages/consumptionLEDS/main.js',
            template: 'public/index.html',
            title: 'consumptionLEDS',
            chunks: ['chunk-vendors','chunk-common', 'consumptionLEDS']
        },
    },

}
// OS.JS CORE

const fs = require('fs')

const express = require('express')
const system = express()
system.set('view engine', 'ejs')

const filesystem = require('./fs.js')
filesystem.prep(system)
console.log(`Root directory is ${filesystem.root}.`)

const systeminfo = require('./si.js')
systeminfo.prep(system)
console.log(`SystemInfo running API version ${systeminfo.siver}.`)

const home = require('./home.js')
home.prep(system)

const apps = require('./apps.js')
apps.prep(system)

system.get('/res/:cat/:file', (req, res) => {
    if (fs.existsSync(filesystem.get(`/res/${req.params.cat}/${req.params.file}`))) {
        res.sendFile(filesystem.get(`/res/${req.params.cat}/${req.params.file}`))
    } else {
        res.status(404).send('RES:NOTFOUND')
    }
})

system.listen(4201, 'localhost', () => console.log('System interface server started on port 4201.'))
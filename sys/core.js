// OS.JS CORE

const fs = require('fs')

const express = require('express')
const system = express()
system.set('view engine', 'ejs')

const filesystem = require('./fs.js')
filesystem.prep(system)
console.log(`Root directory is ${filesystem.root}.`)

const home = require('./home.js')
home.prep(system)

system.get('/res/:cat/:file', (req, res) => {
    if (fs.existsSync(filesystem.get(`/res/${req.params.cat}/${req.params.file}`))) {
        res.sendFile(filesystem.get(`/res/${req.params.cat}/${req.params.file}`))
    } else {
        res.statusCode(404).send('RES:NOTFOUND')
    }
})

system.listen(4201, 'localhost', () => console.log('System interface server started on port 4201.'))
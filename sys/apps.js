// OS.JS APPLICATION HANDLER

const express = require('express')
const filesystem = require('./fs.js')
const fs = require('fs')
const slash = require('slash')
const path = require('path')

const isDirectory = source => fs.lstatSync(source).isDirectory()
const getDirectories = source => fs.readdirSync(source).map(name => slash(path.join(source, name))).filter(isDirectory)

var appdirs = getDirectories(filesystem.get('/apps'))
var appids = []
for (var i=0; i<appdirs.length; i++) {
    var currentapp = appdirs[i].split('/')[appdirs[i].split('/').length-1]
    appids[currentapp] = require(filesystem.get(`/apps/${currentapp}/id.json`))
}
console.log(`${appdirs.length} application(s) found.`)

module.exports = {

    prep: function(system) {

        system.get('/apps', (req, res) => {

            let content = ''
            for (var i=0; i<appdirs.length; i++) {
                var currentapp = appdirs[i].split('/')[appdirs[i].split('/').length-1]
                if ((i%4) == 0 && (i != 0)) content += '</div>'
                if ( ((i%4)==0) || (i==0) ) content += '<div class="row mb-5">'
                content += '<div class="col-3 text-center">'
                content += `<a class=\"btn-link\" href=\"/apps/${currentapp}\">`
                content += `<img width="128px" src=\"/apps/${currentapp}/icon\"><br>`
                content += appids[currentapp].name
                content += '</a>'
                content += '</div>'
                if (i == appdirs.length-1) content += '</div>'
            }

            res.render(filesystem.get('/res/parts/apps'), {
                list: content
            })

        })

        system.get('/apps/:id', (req, res) => {

            if (appids[req.params.id] != undefined) {

                res.render(filesystem.get('/res/parts/frame'), {
                    page: filesystem.get(`/apps/${req.params.id}/main`),
                    name: appids[req.params.id].name
                })

            } else {
                res.status(404).send('APPS:NOTFOUND')
            }

        })

        system.get('/apps/:id/icon', (req, res) => {
            if (fs.existsSync(filesystem.get(`/apps/${req.params.id}/icon.svg`))) res.sendFile(filesystem.get(`/apps/${req.params.id}/icon.svg`))
            else res.sendFile(filesystem.get('/res/img/app-noicon.svg'))
        })

        system.get('/apps/:id/res/:cat/:file', (req, res) => {
            if (fs.existsSync(filesystem.get(`/apps/${req.params.id}/res/${req.params.cat}/${req.params.file}`))) {
                res.sendFile(filesystem.get(`/apps/${req.params.id}/res/${req.params.cat}/${req.params.file}`))
            } else {
                res.status(404).send('RES:INVALID')
            }
        })

        system.get('/apps/:id/pg/:pg', (req, res) => {
            if (fs.existsSync(filesystem.get(`/apps/${req.params.id}/pages/${req.params.pg}`))) {
                res.render(filesystem.get('/res/parts/frame'), {
                    page: filesystem.get(`/apps/${req.params.id}/pages/${req.params.pg}`),
                    name: appids[req.params.id].name
                })
            } else {
                res.status(404).send('APPS:NOPG')
            }
        })

    }
    
}
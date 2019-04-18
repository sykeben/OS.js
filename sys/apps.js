// OS.JS APPLICATION HANDLER

const express = require('express')
const fs = require('./fs.js')

module.exports = {

    prep: function(system) {

        system.get('/apps', (req, res) => {
            res.render(fs.get('/res/parts/apps'))
        })

    }
    
}
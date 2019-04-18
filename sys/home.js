// OS.JS HOME SCREEN

const express = require('express')
const filesystem = require('./fs.js')

module.exports = {
    
    prep: function(system) {

        system.get('/', (req, res) => {
            res.render(filesystem.get('res/parts/home'))
        })

    }

}
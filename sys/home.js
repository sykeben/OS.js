// OS.JS HOME SCREEN

const express = require('express')
const fs = require('./fs.js')

module.exports = {
    
    prep: function(system) {

        system.get('/', (req, res) => {
            res.render(fs.get('res/parts/home'))
        })

    }

}
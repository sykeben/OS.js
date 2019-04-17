// OS.JS SYSTEMINFO

const si = require('systeminformation')
const express = require('express')

module.exports = {

    siver: si.version(),

    prep: function(system) {

        system.get('/si/:cat/:data', (req, res) => {

            var output = ''
            const cat = req.params.cat
            const data = req.params.data
            if (cat == 'ver') { // VERSION

                if (data == 'num') { // number
                    res.send(si.version().toString())
                } else { // invalid
                    output = '[inv]'
                }

            } else if (cat == 'bat') { // BATTERY

                if (data == 'per') { // percent
                    si.battery()
                        .then(data => res.send(data.percent.toString()))
                        .catch(error => output = '[err]')
                } else if (data == 'acc') { // ac connected
                    si.battery()
                        .then(data => output = res.send(data.acconnected.toString()))
                        .catch(error => output = '[err]')
                } else { // invalid
                    output = '[inv]'
                }

            } else { // INVALID
                output = '[inv]'
            }

            if (output == '[inv]') {
                res.status(404).send('SI:INVALID')
            } else if (output == '[err]') {
                res.status(400).send('SI:ERROR')
            }

        })

    }

}
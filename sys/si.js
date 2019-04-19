// OS.JS SYSTEMINFO

const si = require('systeminformation')
const express = require('express')
const dns = require('dns')

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
                        .then(data => res.send(data.acconnected.toString()))
                        .catch(error => output = '[err]')
                } else { // invalid
                    output = '[inv]'
                }

            } else if (cat == 'net') { // NETWORK

                if (data == 'con') { // connectivity
                    dns.lookup('www.google.com', function(err) {
                        if (err && err.code == 'ENOTFOUND') res.send(false)
                        else res.send(true)
                    })
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

    },

    getStatBarImgs: function() {

        let netimg = ''
        dns.lookup('www.google.com', function(err) {
            if (err && err.code == 'ENOTFOUND') netimg = '/res/img/net-offline.svg'
            else netimg = '/res/img/net-online.svg'
        })

        let batimg = ''
        let batper = 0
        si.battery()
            .then(data => {
                if (data.acconnected) {
                    if (data.percent < 95) batimg = '/res/img/bat-charging.svg'
                    else batimg = '/res/img/bat-charged.svg'
                } else {
                    if (data.percent <= 25) batimg = '/res/img/bat-1.svg'
                    else if (data.percent > 25 && data.percent <= 50) batimg = '/res/img/bat-2.svg'
                    else if (data.percent > 50 && data.percent <= 75) batimg = '/res/img/bat-3.svg'
                    else if (data.percent > 75) batimg = '/res/img/bat-4.svg'
                }
                batper = data.percent
            })
            .catch(error => {})


        return { bat: batimg, net: netimg, per: batper }
        
    }

}
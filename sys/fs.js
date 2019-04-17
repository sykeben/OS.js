// OS.JS FILESYSTEM

const path = require('path')
const slash = require('slash')

module.exports = {

    root: slash(path.resolve(path.join(__dirname, '..'))),

    get: function(subdir) { return slash(path.resolve(path.join(__dirname, '..', subdir))) },

    prep: function(system) {
        // Not needed yet, but put into place anyway.
    }

}
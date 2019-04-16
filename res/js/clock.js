setInterval(function() {
    const date = new Date()
    document.getElementById('time').innerHTML = date.toLocaleTimeString()
}, 1000)
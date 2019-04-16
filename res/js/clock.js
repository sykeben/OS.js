function updateTime() {
    const date = new Date()
    document.getElementById('time').innerHTML = date.toLocaleTimeString()
}

window.onload = updateTime
setInterval(updateTime, 1000)
function updateSysData() {

    $.getJSON('/si/bat/per', (json) => {
        document.getElementById('bat-percent').innerHTML = json.toString()
    })

    $.getJSON('/si/bat/acc', (json) => {
        if (json.toString() == 'true') {
            document.getElementById('bat-charging').innerHTML = 'Currently'
        } else {
            document.getElementById('bat-charging').innerHTML = 'Not'
        }
    })

    setTimeout(updateSysData, 5000)

}

window.onload = updateSysData
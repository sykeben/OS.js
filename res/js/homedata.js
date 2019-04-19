const statmap = new Map(); statmap.set('true', true); statmap.set('false', false)

function updateSysData() {

    $.getJSON('/si/bat/acc', (json) => {
        
        const charging = statmap.get(json.toString())

        $.getJSON('/si/bat/per', (json) => {
            const percent = json.toString()
            const text = document.getElementById('bat-percent')
            const image = document.getElementById('bat-image')

            text.innerHTML = `${percent}%`

            if (charging) {
                if (parseInt(percent) < 95) image.setAttribute('src', '/res/img/bat-charging.svg')
                else image.setAttribute('src', '/res/img/bat-charged.svg')
            } else {
                if (parseInt(percent) <= 25) image.setAttribute('src', '/res/img/bat-1.svg')
                else if (parseInt(percent) > 25 && parseInt(percent) <= 50) image.setAttribute('src', '/res/img/bat-2.svg')
                else if (parseInt(percent) > 50 && parseInt(percent) <= 75) image.setAttribute('src', '/res/img/bat-3.svg')
                else if (parseInt(percent) > 75) image.setAttribute('src', '/res/img/bat-4.svg')
            }

        })

    })

    $.getJSON('/si/net/con', (json) => {

        const online = statmap.get(json.toString())

        const image = document.getElementById('net-image')
        const text = document.getElementById('net-state')

        if (online) {
            image.setAttribute('src', '/res/img/net-online.svg')
            text.innerHTML = 'Online'
        } else {
            image.setAttribute('src', '/res/img/net-offline.svg')
            text.innerHTML = 'Offline'
        }

    })


    setTimeout(updateSysData, 2500)

}

window.onload = updateSysData
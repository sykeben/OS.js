function updateFootData() {

    $.getJSON('/si/bat/acc', (json) => {
        
        const statmap = new Map(); statmap.set('true', true); statmap.set('false', false)
        const charging = statmap.get(json.toString())

        $.getJSON('/si/bat/per', (json) => {
            const percent = json.toString()
            const image = document.getElementById('foot-bat')

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

        const statmap = new Map(); statmap.set('true', true); statmap.set('false', false)
        const online = statmap.get(json.toString())

        const image = document.getElementById('foot-net')

        if (online) image.setAttribute('src', '/res/img/net-online.svg')
        else image.setAttribute('src', '/res/img/net-offline.svg')

    })


    setTimeout(updateFootData, 5000)

}

window.onload = updateFootData
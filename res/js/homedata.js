function updateSysData() {

    $.getJSON('/si/bat/acc', (json) => {
        
        const statmap = new Map(); statmap.set('true', true); statmap.set('false', false)
        const charging = statmap.get(json.toString())

        $.getJSON('/si/bat/per', (json) => {
            const percent = json.toString()
            const text = document.getElementById('bat-percent')
            const image = document.getElementById('bat-image')

            text.innerHTML = percent

            if (charging) {
                if (parseInt(percent) >= 100) image.setAttribute('src', '/res/img/bat-charging.svg')
                else image.setAttribute('src', '/res/img/bat-charged.svg')
            } else {
                if (parseInt(percent) <= 25) image.setAttribute('src', '/res/img/bat-1.svg')
                else if (parseInt(percent) > 25 && parseInt(percent) <= 50) image.setAttribute('src', '/res/img/bat-2.svg')
                else if (parseInt(percent) > 50 && parseInt(percent) <= 75) image.setAttribute('src', '/res/img/bat-3.svg')
                else if (parseInt(percent) > 75) image.setAttribute('src', '/res/img/bat-4.svg')
            }

        })

    })


    setTimeout(updateSysData, 5000)

}

window.onload = updateSysData
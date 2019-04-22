const iframe = document.getElementById('web-frame')

function button(data) {

    if (data == 'goPrev') {

    } else if (data == 'goNext') {

    } else if (data == 'goNav') {
        iframe.setAttribute('src', document.getElementById('nav-url').value)
    }

}
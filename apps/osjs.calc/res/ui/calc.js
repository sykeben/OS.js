const display = document.getElementById('display')
var resetState = false
var lastType = 'nul'

function calcClear() {

    resetState = true
    display.value = '0'
    lastType = 'nul'

}

function calcButton(button) {

    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(button) > -1) {
        if (resetState) {
            resetState = false
            display.value = button
        } else {
            display.value += button
        }
        lastType = 'num'
    } else if (['+', '-', '*', '/'].indexOf(button) > -1) {
        if (lastType == 'num') {
            display.value += ` ${button} `
        }
        lastType = 'op'
    }

}

function calcGo() {

    if (lastType == 'num') {
        display.value = eval(display.value)
    }

}

calcClear()
const colorRadios = document.querySelectorAll('form > fieldset:nth-of-type(1) input')
const textInput = document.querySelector('form > fieldset:nth-of-type(3) textarea')
const text = document.querySelector('form > figure > p')
const shirt = document.querySelector('form > figure > svg')

const shirtContainer = document.querySelector('.shirt-container')

//show shirt example when javascript is on 
shirtContainer.style.display = "block"

colorRadios.forEach(radio => {
    radio.addEventListener('change', handleColorChange)
})


textInput.addEventListener('keyup', handleTextChange)


function handleColorChange(e) {
    console.log(e.target.value)

    if (e.target.value === 'white') {
        text.style.setProperty('--textColor', 'black')
    }
    else {
        text.style.setProperty('--textColor', 'white')
    }

    switch (e.target.value) {
        case 'blue':
            shirt.style.setProperty("--shirtColor", "#2d2dff")
            break;
        case 'red':
            shirt.style.setProperty("--shirtColor", "#e82727")
            break;

        case 'white':
            shirt.style.setProperty("--shirtColor", "#efefef")
            break;

        case 'black':
            shirt.style.setProperty("--shirtColor", "#0e0e0e")
            break;

        default:
            break;
    }


}

function handleTextChange(e) {
    text.textContent = e.target.value
}
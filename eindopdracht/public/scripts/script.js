const colorRadios = document.querySelectorAll('form > fieldset:nth-of-type(1) input')
const genderRadios = document.querySelectorAll('form > fieldset:nth-of-type(2) input')
const textInput = document.querySelector('form > fieldset:nth-of-type(3) textarea')
const text = document.querySelector('form > figure > p')
const shirt = document.querySelector('form > figure > svg')
const shirtContainer = document.querySelector('.shirt-container')
let radioFielset = document.querySelector('.create-form > fieldset:nth-of-type(1)')
let genderFielset = document.querySelector('.create-form > fieldset:nth-of-type(2)')
let textArea = document.querySelector('.create-form > fieldset > textarea')

// LOCAL STORAGE USER
if (window.localStorage) {
    //set new userID when it doens't already exist
    let userIdMessage = document.querySelector('.id-message')
    if (userIdMessage) {
        let userID = document.querySelector('#id').textContent

        if (!localStorage.getItem('USER_ID')) {
            localStorage.setItem('USER_ID', userID)
            console.log('setting item');
        }
        userIdMessage.style.opacity = "0"
    }


    //get new and current location
    let newLocation = localStorage.getItem('USER_ID');
    let currentLocation = window.location.pathname.replace('/', '')
    //if current location isn't equal to the localstorage location, redirect user to his location
    if (currentLocation !== newLocation && !window.location.pathname.includes('create')) {
        console.log('sending')
        window.location = newLocation
    }

}

// FORM VALIDATION
let inputFieldsets = Array.from(document.querySelectorAll('fieldset'))
if (inputFieldsets.length > 0) {
    inputFieldsets.forEach(fieldset => {
        fieldset.addEventListener('blur', handleBlur, true)
    })
    let submitButton = document.querySelector('.create-form > button[type="submit"]')
    submitButton.addEventListener('click', checkFormValidation)

    colorRadios.forEach(radio => {
        radio.addEventListener('click', () => {
            radioFielset.classList.remove('error')
        })
    })
    genderRadios.forEach(radio => {
        radio.addEventListener('click', () => {
            genderFielset.classList.remove('error')
        })
    })
}



// END FORM VALIDATION

//show shirt example when javascript is on 
if (shirtContainer) {
    shirtContainer.style.display = "block"
}

colorRadios.forEach(radio => {
    radio.addEventListener('change', handleColorChange)
})

if (textInput) {
    textInput.addEventListener('keyup', handleTextChange)
}

// when color radio buttons change value
function handleColorChange(e) {
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

function handleBlur(e) {
    if (e.target.value === '') {
        e.target.classList.add('error')
    }
    else {
        e.target.classList.remove('error')
    }
}

function checkFormValidation(e) {
    let colorRadioValue = document.querySelector('input[name="color"]:checked')
    let genderRadioValue = document.querySelector('input[name="gender"]:checked')
    if (!colorRadioValue) {
        radioFielset.classList.add('error')
    }
    if (!genderRadioValue) {
        genderFielset.classList.add('error')
    }
    if (textArea.value === '') {
        textArea.classList.add('error')
    }
}
const createForm = document.querySelector('.create-form')
const colorRadios = document.querySelectorAll('form > fieldset:nth-of-type(1) input')
const genderRadios = document.querySelectorAll('form > fieldset:nth-of-type(2) input')
const sizeSelect = document.querySelector('form > fieldset:nth-of-type(2) select')
const textInput = document.querySelector('form > fieldset:nth-of-type(3) textarea')
const text = document.querySelector('form > figure > p')
const shirt = document.querySelector('form > figure > svg')
const shirtContainer = document.querySelector('.shirt-container')
const radioFielset = document.querySelector('.create-form > fieldset:nth-of-type(1)')
const genderFielset = document.querySelector('.create-form > fieldset:nth-of-type(2)')
const textArea = document.querySelector('.create-form > fieldset > textarea')


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

// SHIRT EXAMPLE
//show shirt example when javascript is on 
if (shirtContainer) {
    shirtContainer.style.display = "block"
}
//change shirt color when color changes
colorRadios.forEach(radio => {
    radio.addEventListener('change', handleColorChange)
})

//show text on shirt everytime the user lifts a key
if (textInput) {
    textInput.addEventListener('keyup', handleTextChange)
}

// add info to page when it's still in local storage
if (window.location.pathname.includes('create')) {
    if (window.localStorage) {
        const formObject = JSON.parse(localStorage.getItem('SHIRT_INFO'))
        //fill if localstorage forminfo isn't empty
        if (formObject) {
            colorRadios.forEach(radio => {
                if (radio.value === formObject.color) {
                    radio.checked = true;
                }
            })
            genderRadios.forEach(radio => {
                if (radio.value === formObject.gender) {
                    radio.checked = true;
                }
            })
            sizeSelect.value = formObject.size

            if (formObject !== null) {
                textArea.value = formObject.text
            }
        }


        // remove localstorage when form is submitted
        createForm.addEventListener('submit', function () {
            localStorage.setItem('SHIRT_INFO', null)
        })
    }
}


// when color radio buttons change value
function handleColorChange(e) {
    if (e.target.value === 'white') {
        text.style.setProperty('--textColor', 'black')
    }
    else {
        text.style.setProperty('--textColor', 'white')
    }
    //change colors
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

//changes the value of the shirt message
function handleTextChange(e) {
    text.textContent = e.target.value
}

//adds error to target of the click class when value isn't filled
function handleBlur(e) {
    // add to localstorage for later finishing
    if (window.localStorage) {
        let formObject = getFormValues()
        localStorage.setItem('SHIRT_INFO', JSON.stringify(formObject))
        console.log(JSON.parse(localStorage.getItem('SHIRT_INFO')))
    }


    if (e.target.value === '') {
        e.target.classList.add('error')
    }
    else {
        e.target.classList.remove('error')
    }
}

//check if the values are valid and add error class when they are not
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

function getFormValues() {
    let checkedColor = document.querySelector('form > fieldset:nth-of-type(1) input:checked')
    let colorValue = null;
    if (checkedColor) {
        colorValue = checkedColor.value
    }
    let checkedGender = document.querySelector('form > fieldset:nth-of-type(2) input:checked')
    let genderValue = null;
    if (checkedGender) {
        genderValue = checkedGender.value
    }

    let sizeValue = document.querySelector('form > fieldset:nth-of-type(2) select').value

    let textValue = textArea.value
    let formObject = { color: colorValue, gender: genderValue, size: sizeValue, text: textValue }
    return formObject;
}
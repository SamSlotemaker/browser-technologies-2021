const createForm = document.querySelector('.create-form')
const colorRadios = document.querySelectorAll('form > fieldset:nth-of-type(1) input')
const colorRadioLabels = document.querySelectorAll('form > fieldset:nth-of-type(1) input+label')
const genderRadios = document.querySelectorAll('form > fieldset:nth-of-type(2) input')
const sizeSelect = document.querySelector('form > fieldset:nth-of-type(2) select')
const textInput = document.querySelector('form > fieldset:nth-of-type(3) textarea')
const text = document.querySelector('form > figure > p')
const shirt = document.querySelector('form > figure > svg')
const shirtContainer = document.querySelector('.shirt-container')
const radioFielset = document.querySelector('.create-form > fieldset:nth-of-type(1)')
const genderFielset = document.querySelector('.create-form > fieldset:nth-of-type(2)')
const textArea = document.querySelector('.create-form > fieldset > textarea')
const nextBtn = document.querySelector('#nextBtn')
const prevBtn = document.querySelector('#prevBtn')
const steps = document.querySelector('.steps')


// LOCAL STORAGE USER ID
if (storageAvailable('localStorage')) {
    //set new userID when it doens't already exist
    let userIdMessage = document.querySelector('.id-message')
    let userIdMessage2 = document.querySelector('.id-message-2')
    if (userIdMessage) {
        let userID = document.querySelector('#id').textContent

        if (!localStorage.getItem('USER_ID')) {
            localStorage.setItem('USER_ID', userID)
        }
        userIdMessage2.style.display = 'none'
    }

    //get new and current location
    let newLocation = localStorage.getItem('USER_ID');
    let currentLocation = window.location.pathname.replace('/', '')
    //if current location isn't equal to the localstorage location, redirect user to his location
    if (currentLocation !== newLocation && !window.location.pathname.includes('create')) {
        window.location = newLocation
    }
} else {
    //check if clipboard exists in navigator
    if ('clipboard' in navigator) {
        let userIdMessage2 = document.querySelector('.id-message-2')
        if (userIdMessage2) {
            let userID = document.querySelector('#id').textContent
            userIdMessage2.innerHTML += ', of kopieer jouw ID naar je clipboard door <span>hier</span> te klikken'
            let span = document.querySelector('.id-message-2 span')
            //copy id to clipboard when user clicks
            span.addEventListener('click', () => {
                navigator.clipboard.writeText(userID);
                alert('je heb userID: ' + userID + ' naar je clipboard gekopieerd')
            })
        }
    }
}

// FORM VALIDATION
let inputFieldsets = Array.from(document.querySelectorAll('fieldset'))
if (inputFieldsets.length > 0) {
    inputFieldsets.forEach(fieldset => {
        fieldset.addEventListener('blur', handleBlur, true)
    })
    //add formvalidation to textfield on form submit
    let submitButton = document.querySelector('.create-form > button[type="submit"]')
    submitButton.addEventListener('click', function () {
        console.log(currentTab)
        checkFormValidation(currentTab)
    })
    //remove error when a button is clicked
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

//add progressive form when javascript is enabled
if (createForm) {
    createForm.classList.add('prog-form')
}
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
    if (storageAvailable('localStorage')) {
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
    if (storageAvailable('localStorage')) {
        let formObject = getFormValues()
        localStorage.setItem('SHIRT_INFO', JSON.stringify(formObject))
    }


    if (e.target.value === '') {
        e.target.classList.add('error')
    }
    else {
        e.target.classList.remove('error')
    }
}

//check if the values are valid and add error class when they are not
function checkFormValidation(n) {
    let colorRadioValue = document.querySelector('input[name="color"]:checked')
    let genderRadioValue = document.querySelector('input[name="gender"]:checked')
    if (n === 0 && !colorRadioValue) {
        radioFielset.classList.add('error')
        return false
    }
    if (n === 1 && !genderRadioValue) {
        genderFielset.classList.add('error')
        return false
    }
    if (n === 2 && textArea.value === '') {
        textArea.classList.add('error')
        return false
    }
    return true
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


// PROGRESSIVE FORM
// part of the code from https://www.w3schools.com/howto/howto_js_form_steps.asp
var currentTab = 0; // Current tab is set to be the first tab (0)
if (createForm) {
    nextBtn.addEventListener('click', function () {
        nextPrev(1, 'next')
    })
    prevBtn.addEventListener('click', function () {
        nextPrev(-1)
    })

    showTab(currentTab); // Display the current tab
    // change shirt color buttons
    colorRadioLabels.forEach((radio, index) => {
        radio.style.backgroundColor = colorRadios[index].value
        radio.style.color = colorRadios[index].value
    })
}

//show correct form tab
function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.querySelectorAll("fieldset");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").style.display = "none"
    } else {
        document.getElementById("nextBtn").style.display = "block"
    }
}

//handle button click
function nextPrev(n, button) {
    if (button == 'next') {
        if (!checkFormValidation(currentTab)) {
            return;
        }
    }
    // This function will figure out which tab to display
    var x = document.querySelectorAll("fieldset");
    // Exit the function if any field in the current tab is invalid:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (steps) {
        steps.textContent = (currentTab + 1) + '/3'
    }
    showTab(currentTab);

}

// check if localstrage exist (Rowin)
function storageAvailable(type) {
    try {
        const storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}
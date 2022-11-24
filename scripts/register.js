const form = document.querySelector("form") 
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const emailInput = document.getElementById("email")
const phoneNumberInput = document.getElementById("phoneNumber")
const nameInput = document.getElementById("name")


userStorage = JSON.parse(localStorage.getItem("kunumi_users")) || [];
console.log(userStorage);


const saveToLocalStorage = (userStorage) => {
	localStorage.setItem("kunumi_users", JSON.stringify(userStorage));
};

const usernameExist = (user) =>{

    const usernameArray = userStorage.filter(element => element.username);
    let result = false
    usernameArray.forEach(element => {
        if(element.username === user){
            return result = true
        }
    })
    return result
}

const debounce = (fn, delay = 500) => {
    let timeoutId;

    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() =>{
            fn.apply(null, args);
        }, delay);
    }
} 

const isEmpty = (value) => {
    return value === "" ? true : false
}



const checkUsername = (e) => {
    const username = usernameInput.value.trim();
    if (isEmpty(username)) {
        showError(usernameInput,'Este campo es obligatorio')
        usernameInput.classList.remove('validInput')
        usernameInput.classList.add('invalidInput')
    } else if (!isValidUsername(username)) {
        showError(usernameInput, 'Debe tener entre 6 y 20 caracteres, entre letras y números')
        usernameInput.classList.remove('validInput')
        usernameInput.classList.add('invalidInput')
    } else if(usernameExist(username)){
        showError(usernameInput, 'Ya existe este nombre de usuario')
        usernameInput.classList.remove('validInput')
        usernameInput.classList.add('invalidInput')
    } else {
        showError(usernameInput, '')
        usernameInput.classList.remove('invalidInput')
        usernameInput.classList.add('validInput')
        return true
    }
}

const isValidUsername = (username) =>{
    const usernameRegEx = /^[a-z-A-Z-0-9_-]{6,20}$/

    return usernameRegEx.test(username)
}

const showError = (inputName, message) => {
    let textElement = inputName.nextElementSibling
    textElement.innerHTML = `${message}`
    return
}

const isValidPassword = (password) => {
    const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    
    return passwordRegEx.test(password)
}


const checkPassword = (e) => {
    const password = passwordInput.value.trim();

    if (isEmpty(password)) {
        showError(passwordInput, 'Este campo es obligatorio')
        passwordInput.classList.remove('validInput')
        passwordInput.classList.add('invalidInput')
    } else if(!isValidPassword(password)) {
        showError(passwordInput, 'La contraseña debe tener al menos 8 caracteres y contener  una letra minúscula, una letra mayúscula y un número')
        passwordInput.classList.remove('validInput')
        passwordInput.classList.add('invalidInput')
    } else {
        showError(passwordInput, '')
        passwordInput.classList.remove('invalidInput')
        passwordInput.classList.add('validInput')
        return true
    }
}


//debe verificar que es un formato de email válido y no vacío
//que no este en el local storage
const isValidEmail = (email) => {
    const emailRegEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    return emailRegEx.test(email)
}

const checkEmail = (e) => {
    const email = emailInput.value.trim()
    
    if (isEmpty(email)) {
        showError(emailInput,'Este campo es obligatorio')
        emailInput.classList.remove('validInput')
        emailInput.classList.add('invalidInput')
    } else if (!isValidEmail(email)) {
        showError(emailInput, 'El email no es válido')
        emailInput.classList.remove('validInput')
        emailInput.classList.add('invalidInput')
    } else if(emailExist(email)){
        showError(emailInput, 'Ya existe una cuenta con esta dirección de email')
        emailInput.classList.remove('validInput')
        emailInput.classList.add('invalidInput')
    } else {
        showError(emailInput, '')
        emailInput.classList.remove('invalidInput')
        emailInput.classList.add('validInput')
        return true
    }
}


const emailExist = (email) => {

    const emailArray = userStorage.filter(element => element.email);
    let result = false
    emailArray.forEach(element => {
        if(element.email === email){
            return result = true
        }
    })
    return result
}

//debe verificar que tenga 10 números.
// checkPhoneNumber
const checkPhoneNumber = (e) => {
    const phoneNumber = phoneNumberInput.value.trim();

    if (isEmpty(phoneNumber)) {
        showError(phoneNumberInput, 'Este campo es obligatorio')
        phoneNumberInput.classList.remove('validInput')
        phoneNumberInput.classList.add('invalidInput')
    } else if (!isValidPhoneNumber(phoneNumber)) {
        showError(phoneNumberInput, 'El teléfono debe contener 10 caracteres (no colocar 0 ni 15)')
        phoneNumberInput.classList.remove('validInput')
        phoneNumberInput.classList.add('invalidInput')
    } else {
        showError(phoneNumberInput, '')
        phoneNumberInput.classList.remove('invalidInput')
        phoneNumberInput.classList.add('validInput')
        return true
    }
}

const isValidPhoneNumber = (phoneNumber) => {
    const numberOfDigits = phoneNumber.length;
    if (numberOfDigits === 10) {
        return true
    } else return false;
}


const checkName = (e) => {
    const name = nameInput.value.trim();

    if (isEmpty(name)) {
        showError(nameInput, 'Este campo es obligatorio')
        nameInput.classList.remove('validInput')
        nameInput.classList.add('invalidInput')
    } else {
        showError(nameInput, '')
        nameInput.classList.remove('invalidInput')
        nameInput.classList.add('validInput')
        return true
    }
}

const selectInput = (e) => {
    const selected = e.target.id

    switch (selected) {
        case "name":
            checkName();
        case "username":
            checkUsername();
            break;
        case "password":
            checkPassword();
            break;
        case "email":
            checkEmail();
            break;
        case "phoneNumber":
            checkPhoneNumber();
            break;
    
        default:
            break;
    }
}

const registerUser = (e) => {
    e.preventDefault()
    
    let isUsernameValid = checkUsername()
    let isEmailValid = checkEmail()
    let isPasswordValid = checkPassword()
    let isPhoneNumberValid = checkPhoneNumber()
    let isNameValid = checkName()

    let isFormValid = isUsernameValid & isEmailValid & isPasswordValid & isPhoneNumberValid & isNameValid;

    if (isFormValid) {
        let userData ={name:nameInput.value, username: usernameInput.value, phoneNumber: phoneNumberInput.value, email:emailInput.value, password: passwordInput.value}
        userStorage.push(userData)
        saveToLocalStorage(userStorage);
        window.location.href = `login.html`
    }
}

const init = () => {
    form.addEventListener("input", debounce(selectInput))
    form.addEventListener("submit", registerUser)
}

init();
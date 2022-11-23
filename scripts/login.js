const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const form = document.querySelector("form")
const loginError = document.getElementById("loginError")

let userStorage = JSON.parse(localStorage.getItem("user")) || [];
let loginStorage = JSON.parse(sessionStorage.getItem("login")) || [];


const saveToSessionStorage = (loginStorage) => {
	sessionStorage.setItem("login", JSON.stringify(loginStorage));
};


const checkDatabase = (email, password) => {
    
    let result = false;
    userStorage.forEach(element => {
        if(element.email === email && element.password === password){
            return result = true
        }
    })
    return result
}

const getUserData = (email) =>{
    const userData = userStorage.filter(element => element.email === email)
    return userData
}


const loginAuth = (e) => {
    e.preventDefault();
    const email = emailInput.value.trim()
    const password = passwordInput.value.trim()
    if (checkDatabase(email, password)) {
        const userdata= getUserData(email)
        loginStorage.push(userdata[0])
        saveToSessionStorage(loginStorage)
        window.location.href = `../index.html`
    } else {
        loginError.innerHTML = `Los datos ingresados no son correctos`
        emailInput.classList.add("invalidInput")
        passwordInput.classList.add("invalidInput")
    }
}

const cleanError = () => {
    loginError.innerHTML = ""
    emailInput.classList.remove("invalidInput")
    passwordInput.classList.remove("invalidInput")
}

const init = () => {
    form.addEventListener("submit", loginAuth)
    form.addEventListener("input", cleanError)
}

init ()
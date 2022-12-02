//Toma los datos guardados en LS y SS; en caso de no existir, crea un array vacío
let userStorage = JSON.parse(localStorage.getItem("users")) || [];
let loginStorage = JSON.parse(sessionStorage.getItem("login_data")) || [];



//Guarda el logueo en la session storage para después personalizar la página
const saveToSessionStorage = (loginStorage) => {
	sessionStorage.setItem("login_data", JSON.stringify(loginStorage));
};


//Chequea en el local storage ("database") si coinciden email y pass
const checkDatabase = (email, password) => {
    
    let result = false;
    userStorage.forEach(element => {
        if(element.email === email && element.password === password){
            return result = true
        }
    })
    return result
}


//Toma los datos del usuario logueado para guardarlos en la sesión
const getUserData = (email) =>{
    const userData = userStorage.filter(element => element.email === email)
    return userData
}


//Autentifica los datos de logueo; si es válido, lleva a index.html, caso contrario muestra error
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


//Limpia errores del form
const cleanError = () => {
    loginError.innerHTML = ""
    emailInput.classList.remove("invalidInput")
    passwordInput.classList.remove("invalidInput")
}

//Cambia el contenido del botón "createAccountBtn" para resoluciones bajas
const changeContentBtn = () => {
    if (screen.width < 600){
        createAccountBtn.innerHTML = `<a href="register.html">Registrate!</a>`
    } else createAccountBtn.innerHTML= `<a href="register.html">Todavía no tenés una cuenta? Registrate!</a>`
}



const init = () => {
    form.addEventListener("submit", loginAuth)
    form.addEventListener("input", cleanError)
    window.addEventListener("resize", changeContentBtn)
    logoContainer.addEventListener("click", goToIndex)
}

init ()
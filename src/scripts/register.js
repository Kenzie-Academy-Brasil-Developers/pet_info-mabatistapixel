import { userRegister } from "./requests.js";

const loginReplace = () => {
    const redirectButton = document.querySelector("#redirect__button")
    redirectButton.addEventListener("click", () => {
        location.replace("/index.html")
    })

}

const handleRegister = () => {
    const inputs = document.querySelectorAll("input")
    const buttonRegister = document.querySelector("#register__submit")

    buttonRegister.addEventListener("click", (event) => {
        event.preventDefault()
        const newUser = {};
    
        inputs.forEach((input) => {
            newUser[input.name] = input.value;
        })
        userRegister(newUser)
    })

}

loginReplace()
handleRegister()

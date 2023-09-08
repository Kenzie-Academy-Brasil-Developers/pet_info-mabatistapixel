import { toast } from "./toast.js";
import { loginRequest } from "./requests.js";

const handleLogin = () => {
    const inputs = document.querySelectorAll("input")
    const button = document.querySelector("#login__submit")
    
    button.addEventListener("click", (event) => {
        event.preventDefault()
        const loginBody = {}
        let count = 0;
        
        inputs.forEach(input => {
            if(input.value.trim() === ''){
                count++
            }

            loginBody[input.name] = input.value
        })
        if(count !== 0){
            return toast('Por favor, preencha todos os campos necessários', '#df1545' )
        }
        loginRequest(loginBody)
    })
}

const registerReplace = () => {

    const registerButton = document.querySelector("#register__button")
    registerButton.addEventListener("click", () => {
        location.replace("src/pages/register.html")

    })
}

handleLogin()
registerReplace() 


let fristN = document.querySelector("#fn")
let lastN = document.querySelector("#ln")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let messageError = document.querySelector("#message-error")
let registerBtn = document.querySelector("#sign-up")

registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (fristN.value === "" || lastN.value === "" || email.value === "" || password.value === ""){
        messageError.innerHTML = "*Please file the data"
    } else {
        localStorage.setItem("fristName", fristN.value)
        localStorage.setItem("lastName", lastN.value)
        localStorage.setItem("email", email.value)
        localStorage.setItem("password", password.value)

        setTimeout(() => {
            window.location = "login.html"
        }, 1500);
    }
})
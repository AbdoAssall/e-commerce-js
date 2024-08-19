let email = document.querySelector("#email")
let password = document.querySelector("#password")
let loginBtn = document.querySelector("#login")
let messageError = document.querySelector("#message-error")

let getEmail = localStorage.getItem("email")
let getPass = localStorage.getItem("password")


loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (email.value === "" || password.value === ""){
        messageError.innerHTML = "Please fill in the required fields"
    } else {
        if (getEmail && getEmail.trim() === email.value.trim() && getPass === password.value.trim()) {
            setTimeout(() => {
                window.location = "index.html"
            }, 1500);
        } else {
            messageError.innerHTML = "Incorrect email or password. Please try again."
        }
    }
})
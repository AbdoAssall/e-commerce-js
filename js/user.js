let user = document.querySelector(".user")
let userInfo = document.querySelector(".user-info")
let username = document.querySelector("#username")
let loginFooter = document.querySelector("#login-footer")
// let favBtn = document.querySelector("#fav-btn")

if (localStorage.getItem("email")){
    username.innerHTML = "Welcome,</br>" + localStorage.getItem("fristName") + " " + localStorage.getItem("lastName")
} else {
    user.addEventListener("click", () =>{
        userInfo.remove()
        window.location = "login.html"
    })
    // favBtn.addEventListener("click", () =>{
    //     window.location = "login.html"
    // })
}

let logout = document.querySelector("#logout")
logout.addEventListener("click", () => {
    localStorage.clear()
    setTimeout(() => {
        window.location = "index.html"
    }, 1500)
})
let user = document.querySelector(".user")
let userInfo = document.querySelector(".user-info")
let username = document.querySelector("#username")
let loginFooter = document.querySelector("#login-footer")

if (localStorage.getItem("email")){
    username.innerHTML = "Welcome,</br>" + localStorage.getItem("fristName") + " " + localStorage.getItem("lastName")
} else {
    user.addEventListener("click", () =>{
        userInfo.remove()
        window.location = "login.html"
    })
}

let logout = document.querySelector("#logout")
logout.addEventListener("click", () => {
    localStorage.clear()
    setTimeout(() => {
        window.location = "index.html"
    }, 1500)
})

// Go to Favorite
let favBtn = document.querySelector("#fav-btn")
let  wishlistFooter = document.querySelector("#wishlist-footer")

if (localStorage.getItem("email")) {
    favBtn.addEventListener("click", () => {
        window.location = "wishlist.html"
    })
    wishlistFooter.addEventListener("click", () => {
        window.location = "wishlist.html"
    })
} else {
    favBtn.addEventListener("click", () => {
        setTimeout(() => {
            window.location = "login.html"
        }, 1000);
    })
    wishlistFooter.addEventListener("click", () => {
        setTimeout(() => {
            window.location = "login.html"
        }, 1000);
    })
}

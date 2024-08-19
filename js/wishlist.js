// open cart
var cartSummary = document.getElementById("cart-summary");
let btnClose = document.querySelector(".btn-close")
var cart = document.getElementById("cart");

function click (btn){
   btn.addEventListener("click", () => {
    if (cartSummary.style.display === "block") {
        cartSummary.style.display = "none";
    }
    else {
        cartSummary.style.display = "block";
    }
})
}
click(btnClose);
click(cart)

////////////////////////////////////////////////////////////
// Go to cart
let cartBtn = document.querySelector("#cart-btn")

if (localStorage.getItem("email")) {
    cartBtn.addEventListener("click", () => {
        window.location = "cart.html"
    })
} else {
    cartBtn.addEventListener("click", () => {
        setTimeout(() => {
            window.location = "login.html"
        }, 1000);
    })
}
// Go to Favorite
let favBtn = document.querySelector("#fav-btn")

if (localStorage.getItem("email")) {
    favBtn.addEventListener("click", () => {
        window.location = "wishlist.html"
    })
} else {
    favBtn.addEventListener("click", () => {
        setTimeout(() => {
            window.location = "login.html"
        }, 1000);
    })
}
///////////////////////////////////////////////
// handel Cart
let getProducts = localStorage.getItem("cart")

let addcart = document.querySelector("#addcart")
let numCount = document.querySelector(".num-count-cart")

let dataPro;
if (getProducts) {
    // Convert the data to obj
    dataPro = JSON.parse(getProducts)
    productIncart(dataPro)
        // update the cart count
    numCount.innerHTML = dataPro.length;
}
if (dataPro.length === 0){
  addcart.innerHTML = `
  <div class="empty-cart text-center mt-3" style="width: 320px;">
      <i class="bi bi-cart-x text-secondary" style="font-size: 60px;"></i>
      <p class="text-secondary" style="font-size: 15px;">You cart is empty</p>
      <a href="index.html" class="btn btn-primary rounded-pill text-uppercase fw-semibold px-4" style="font-size: 14px;">Return to shop</a>
  </div>
 `
}
// Put product in the cart
function productIncart(productsId){
  dataPro.map((item) => {
      addcart.innerHTML += `<div id="item-cart" class="card mb-3 border-0 border-bottom border-secondary-subtle" style="max-width: 540px">
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    src="./Images/${item.imgPath}"
                    class="img-fluid img-card"
                    alt="Product image"
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title" style="font-size: 15px">
                      ${item.name}
                    </h5>
                    <p class="card-text price-priduct">
                      <del>$110.00</del> $${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p class="card-text">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <span class="px-2">${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                    </p>
                  </div>
                </div>
              </div>
            </div>` 
  })
  let cartItem = dataPro.find((item) => item.id === productsId)
  if (cartItem){
      cartItem.quantity += 1
  }
  localStorage.setItem("cart", JSON.stringify(dataPro))
}
// quantity
function increaseQuantity(productId){
    const cartItem = dataPro.find((item) => item.id === productId)
    if (cartItem){
        cartItem.quantity += 1
        localStorage.setItem("cart", JSON.stringify(dataPro))
        updateCartUI()
    }
}
function decreaseQuantity(productId){
    const cartItem = dataPro.find((item) => item.id === productId)
    if (cartItem){
        cartItem.quantity -= 1
        if (cartItem.quantity === 0){
            dataPro = dataPro.filter((item) => item.id !== productId) 
        }
        localStorage.setItem("cart", JSON.stringify(dataPro))
        updateCartUI()
    }
}
function updateCartUI(){
    addcart.innerHTML = ''
    dataPro.map(item => {
        addcart.innerHTML += `<div id="item-cart" class="card mb-3 border-0 border-bottom border-secondary-subtle" style="max-width: 540px">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src="./Images/${item.imgPath}"
              class="img-fluid img-card"
              alt="Product image"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title" style="font-size: 15px">
                ${item.name}
              </h5>
              <p class="card-text price-priduct">
                <del>$110.00</del> $ ${(item.price * item.quantity).toFixed(2)}
              </p>
              <p class="card-text">
              <button onclick="decreaseQuantity(${item.id})">-</button>
              <span class="px-2">${item.quantity}</span>
              <button onclick="increaseQuantity(${item.id})">+</button>
              </p>
            </div>
          </div>
        </div>
      </div>` 
    })   
    // if cart is empty
    if (dataWislist.length === 0 || wishlistProdcuts == ''){
      wishlistProdcuts.innerHTML = `
      <div class="empty-cart text-center">
       <img src="./Images/crossed.png" alt="crossed">
      <p class="mt-4 fs-3 fw-semibold">Wishlist is empty.</p>
      <p class="fw-medium text-secondary" style="font-size: 14px;">You don't have any products in the wishlist yet.</br>
         You will find a lot of interesting products on our "Shop" page.</p>
      <a href="shop.html" class="btn btn-primary rounded-pill text-uppercase fw-semibold px-4" style="font-size: 14px;">Return to shop</a>
    </div>
     `
    } else {
      drawWishlisttProducts(dataWislist);
    }
}
////////////////////////////////////////////////////////////////////////////
// Put products in the Wishlist cart
const wishlist = localStorage.getItem("wishlist")
let wishlistProdcuts = document.querySelector("#products-wishlist")
let wishlistCount = document.querySelector("#wishlist-count");

let dataWislist;
if (wishlist){
  dataWislist = JSON.parse(wishlist)
  drawWishlisttProducts(dataWislist);

  wishlistCount.innerHTML = dataWislist.length;
}
// if cart is empty
if (dataWislist.length === 0 || wishlistProdcuts == '' || wishlist.length === 0){
  wishlistProdcuts.innerHTML = `
  <div class="empty-cart text-center">
       <img src="./Images/crossed.png" alt="crossed">
      <p class="mt-4 fs-3 fw-semibold">Wishlist is empty.</p>
      <p class="fw-medium text-secondary" style="font-size: 14px;">You don't have any products in the wishlist yet.</br>
         You will find a lot of interesting products on our "Shop" page.</p>
      <a href="shop.html" class="btn btn-primary rounded-pill text-uppercase fw-semibold px-4" style="font-size: 14px;">Return to shop</a>
  </div>
 `;
} else {
  drawWishlisttProducts();
}
function drawWishlisttProducts(products){
  let wishlistProdcut = products.map((item) => {
    return `
  <div class="col-xl-3 col-lg-4 col-sm-6 col-12">
        <div class="product-item h-auto card">
          <div class="img-product">
            <img
              src="./images/${item.imgPath}"
              alt="product"
              class="w-100"
              style="height: 150px"
            />
            <div class="remove-wishlist">
              <button class="remove-icon" onclick="delateItem(${item.id})">
                <i class="fa-regular fa-trash-can"></i>
              </button>
              <span class="remove-banar-icon">Remove Wishlist</span>
            </div>
            <div class="overlay-product">
              <img
              src="./images/${item.imgPath}"
              alt="product"
              class="w-100"
              style="height: 150px"
            />
              <ul class="list-over">
                <li>
                  <a href="#">
                    <i class="fa-solid fa-rotate"></i>
                  </a>
                  <span class="caption-item">Add to Compare</span>
                </li>
                <li>
                  <a href="#">
                    <i class="fa-regular fa-eye"></i>
                  </a>
                  <span class="caption-item">Quick view</span>
                </li>
                <li>
                  <a href="#" id="addcart-btn" onClick=addToCart(${item.id})>
                    <i class="fa-solid fa-cart-plus"></i>
                  </a>
                  <span class="caption-item">Add to Cart</span>
                </li>
              </ul>
              
            </div>
          </div>
          <div class="info-product">
            <div class="rate">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <h5 class="title-product">
              <a href="#">${item.name}</a>
            </h5>
            <div class="price-priduct"><del>$110.00</del> $${item.price}</div>
          </div>
        </div>
      </div>
    `
}).join("")
wishlistProdcuts.innerHTML = wishlistProdcut

// Update the total price display
}
// delete product item
function delateItem(productId){
    // Find the index of the product to be removed
    const productIndex = dataWislist.findIndex(item => item.id === productId)
      // If the product exists in the array, remove it
      if (productIndex !== -1)(
        dataWislist.splice(productIndex, 1) // Remove the product from the array
      )
      // Save the updata in local Storge
      localStorage.setItem("wishlist", JSON.stringify(dataWislist))
      // Re-draw the cart UI to reflect the removal
      drawWishlisttProducts(dataWislist)
      updateCartUI()
      // Update the length cart
      wishlistCount.innerHTML = dataWislist.length;
}
/////////////////////////////////////////////////////////////////////////////

// Add Products from the Wishlist to Cart

function addToCart(productId) {
    let product = dataPro.find((p) => p.id === productId);
    let cartItem = dataWislist.find(item => item.id === productId)

    if (product) {
        // If the product is already in the cart, increase the quantity
        product.quantity += 1
    } else {
        //   If the product is not in the cart, add it as a new item
        dataPro.push({
            id: cartItem.id,
            name: cartItem.name,
            price: cartItem.price,
            quantity: cartItem.quantity,
            category: cartItem.category,
            imgPath: cartItem.imgPath,
            wishlist: cartItem.wishlist
        })
    }
    // Save the updated cart to localStorage
    //   addIeam = [...addIeam, product]
    localStorage.setItem("cart", JSON.stringify(dataPro))

    // count of the products
    numCount.innerHTML = dataPro.length;

    updateCartUI()  // Update the UI with the new cart state

}
///////////////////////////////////////////////////////////////////////////////
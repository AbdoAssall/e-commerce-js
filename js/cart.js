let getProducts = localStorage.getItem("cart")
let cartProdcuts = document.querySelector("tbody")
let emptyCart = document.querySelector("#emptyCart")

let addcart = document.querySelector("#addcart")
let numCount = document.querySelector(".num-count-cart")
let cartCount = document.querySelector(".cart-count")

let dataPro;
if (getProducts) {
    // Convert the data to obj
    dataPro = JSON.parse(getProducts)

    drawCartProducts(dataPro);
    // productIncart(dataPro)
    // update the cart count
    numCount.innerHTML = dataPro.length;
    cartCount.innerHTML = `Cart(${dataPro.length})`

    document.querySelector("#cart").addEventListener("click", () =>{
        window.location = "cart.html"
    })
} 
// if cart is empty
if (cartProdcuts == '' || dataPro.length === 0){
  emptyCart.innerHTML = `
  <div class="empty-cart text-center my-4 mb-5">
      <i class="bi bi-cart-x text-secondary" style="font-size: 60px;"></i>
      <p class="text-secondary" style="font-size: 15px;">You cart is empty</p>
  </div>
`;
document.querySelector("#btn-show").innerHTML = "Return to shop"
function deleteAll(){
 window.location = "shop.html"
}
} else {
  drawCartProducts(dataPro)
}
// Put products in the cart summary
   function drawCartProducts(products){
      let table = products.map((item) => {
        return `
        <tr class="text-center">
                <td>
                  <div class="h-auto mx-auto" scope="row" style="width: 80px;">
                    <img
                      src="./images/${item.imgPath}"
                      class="img-fluid img-card"
                      alt="Product image"
                      style="object-fit: cover;"
                    />
                  </div>
                </td>
                <td>${item.name}</td>
                <td>$${item.price}</td>

                <td style="width: 180px">
                  <div class="card-text quantity">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <span class="px-2">${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                  </div>
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="btn btn-block rounded-1 btn-remove" onclick="delateItem(${item.id})">Remove</button>
                </td>
              </tr>
        `
    }).join("")
    cartProdcuts.innerHTML = table

    updateCartSummary();    // Update the total price display
    }
    function updateCartSummary(){
        let totalPrice = dataPro.reduce((sum,item) => sum + (item.price * item.quantity), 0)
        document.querySelector("#total-price").innerHTML = `Subtotal: $${totalPrice.toFixed(2)}`
    }
 // Quantity
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
        cartProdcuts.innerHTML = '';
        dataPro.forEach(item => {
            cartProdcuts.innerHTML += ` <tr class="text-center">
                <td>
                  <div class="h-auto mx-auto" scope="row" style="width: 80px;">
                    <img
                      src="./images/${item.imgPath}"
                      class="img-fluid img-card"
                      alt="Product image"
                      style="object-fit: cover;"
                    />
                  </div>
                </td>
                <td>${item.name}</td>
                <td>$${item.price}</td>

                <td style="width: 180px">
                  <div class="card-text quantity">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <span class="px-2">${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                  </div>
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="btn btn-block rounded-1 btn-remove" onclick="delateItem(${item.id})">Remove</button>
                </td>
              </tr>` 
        })
        // if cart is empty
        if (dataPro.length === 0){
          emptyCart.innerHTML = `
          <div class="empty-cart text-center my-4 mb-5">
              <i class="bi bi-cart-x text-secondary" style="font-size: 60px;"></i>
              <p class="text-secondary" style="font-size: 15px;">You cart is empty</p>
          </div>
        `;
        document.querySelector("#btn-show").innerHTML = "Return to shop"
        document.querySelector("#btn-show").addEventListener("click", ()=> {
          window.location = "shop.html"
        })
         
        } else {
          drawCartProducts(dataPro)
        }
        updateCartSummary(dataPro); 
    }

// delete product item
function delateItem(productId){
    // let updatedCart = dataPro.filter((item) => item.id !== id);

     // Find the index of the product to be removed
    const productIndex = dataPro.findIndex(item => item.id === productId)
    // If the product exists in the array, remove it
    if (productIndex !== -1) {
        dataPro.splice(productIndex, 1)   // Remove the product from the array
    }
    // Save the updata in local Storge
    localStorage.setItem("cart", JSON.stringify(dataPro));
    drawCartProducts(dataPro);  // Re-draw the cart UI to reflect the removal
    updateCartSummary();  // Update the total price UI
    updateCartUI() // Update the cart UI when no products

     // Update the length cart
     numCount.innerHTML = dataPro.length;
     cartCount.innerHTML = `Cart(${dataPro.length})`;
    //  location.reload()
}
// delete All products 
  function deleteAll(){
    localStorage.removeItem("cart")
    dataPro.splice(0)
    drawCartProducts(dataPro)
    updateCartSummary()
    delateItem()
  }
/////////////////////////////////////////////////////////////////////
// get products form the Wishlist
const wishlist = localStorage.getItem("wishlist")
let wishlistCount = document.querySelector("#wishlist-count");

let dataWishlist;
if (wishlist){
  dataWishlist = JSON.parse(wishlist)
  wishlistCount.innerHTML = dataWishlist.length
} 
// Go to Favorite
let favBtn = document.querySelector("#fav-btn")
favBtn.addEventListener("click", () => {
  window.location = "wishlist.html";
})
// Go to Cart
let cartFooter = document.querySelector("#cart-footer")
if (localStorage.getItem("email")) {
  cartFooter.addEventListener("click", () => {
      window.location = "cart.html"
  })
} else {
  cartFooter.addEventListener("click", () => {
          window.location = "login.html"
  })
}
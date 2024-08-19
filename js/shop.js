// open cart
var cartSummary = document.getElementById("cart-summary");
let btnClose = document.querySelector(".btn-close")
var cart = document.getElementById("cart");

function click(btn) {
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
let cartHeader = document.querySelector("#cart-header")

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
if (localStorage.getItem("email")) {
    cartHeader.addEventListener("click", () => {
        window.location = "cart.html"
    })
} else {
    cartHeader.addEventListener("click", () => {
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
/////////////////////////////////////////////////////////
// Add Products 
let allProducts = document.querySelector("#products")

const products = [
    {
        id: 1,
        name: "Chunky leather shoes",
        category: "shose",
        price: "100.99",
        quantity: 1,
        imgPath: "Chunky leather shoes.webp",
        wishlist: false
    },
    {
        id: 2,
        name: "PULSE 3D™ ANC Wireless Headset",
        category: "speaker",
        price: "200.00",
        quantity: 1,
        imgPath: "PULSE 3D™ ANC Wireless Headset.webp",
        wishlist: false
    },
    {
        id: 3,
        name: "Smart Watches 4",
        category: "watches",
        price: "300.99",
        quantity: 1,
        imgPath: "Smart Watches 4.webp",
        wishlist: false
    },
    {
        id: 4,
        name: "Portable bluetooth speaker",
        category: "speaker",
        price: "500.00",
        quantity: 1,
        imgPath: "Portable bluetooth speaker.webp",
        wishlist: false
    },
    {
        id: 5,
        name: "NB Coaches Cap Black",
        category: "cap",
        price: "60.99",
        quantity: 1,
        imgPath: "NB Coaches Cap Black.webp",
        wishlist: false
    },
    {
        id: 6,
        name: "Long Oversize Sweatshirt",
        category: "sweatshirt",
        price: "100.99",
        quantity: 1,
        imgPath: "Long Oversize Sweatshirt.webp",
        wishlist: false
    },
    {
        id: 7,
        name: "Leather White Trainers",
        category: "pants",
        price: "199.00",
        quantity: 1,
        imgPath: "Leather White Trainers.webp",
        wishlist: false
    },
    {
        id: 8,
        name: "Earbuds",
        category: "speaker",
        price: "659.00",
        quantity: 1,
        imgPath: "Earbuds.webp",
        wishlist: false
    },
    {
        id: 9,
        name: "Tbar Collab Music T-Shirt",
        category: "t-shirt",
        price: "100.00",
        quantity: 1,
        imgPath: "Tbar Collab Music T-Shirt.webp",
        wishlist: false
    },
]
function drawItems() {
    let x = products.map((item) => {
        return `
              <div class="col-lg-4 col-sm-6 col-12">
                            <div class="product-item">
                                <div class="img-product">
                                  <img src="images/${item.imgPath}" alt="product" class="w-100" style="height: 330.77px;">
                                  <span class="offer">10% OFF</span>
                                  <div class="overlay-product">
                                    <img src="images/${item.imgPath}" alt="product"  class="w-100" style="height: 330.77px;">
                                    <ul class="list-over">
                                      <li>
                                        <a id="wishlist-btn-${item.id}" class="wishlist-btn" data-product-id="${item.id}" onClick=addToWishlist(${item.id})>
                                          <i class="fa-regular fa-heart heart-empty d-none"></i>
                                           <i class="fa-solid fa-heart heart-solid"></i>
                                        </a>
                                        <span class="caption-item">Add to Wishlist</span>
                                      </li>
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
                                        <a data-product-id id="addcart-btn" onClick=addToCart(${item.id})>
                                           <i class="fa-solid fa-cart-plus"></i>
                                        </a>
                                        <span class="caption-item">Add to Cart</span>
                                      </li>
                                    </ul>
                                    <span class="sale">On Sale!</span>
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
                                  <div class="price-priduct">
                                    <del>$110.00</del> $${item.price}
                                  </div>
                                </div>
                              </div>
                        </div>
        `;
    }).join("")
    allProducts.innerHTML = x
}
drawItems()
//////////////////////////////////////////////////////////////////
// Add Products to Cart

let addcart = document.querySelector("#addcart")
let numCount = document.querySelector(".num-count-cart")
let addIeam = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

if (addIeam) {
    addIeam.map((item) => {
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
    // count of the products
    numCount.innerHTML = addIeam.length;
}
// if cart is empty
if (addIeam.length === 0){
  addcart.innerHTML = `
  <div class="empty-cart text-center mt-3" style="width: 320px;">
      <i class="bi bi-cart-x text-secondary" style="font-size: 60px;"></i>
      <p class="text-secondary" style="font-size: 15px;">You cart is empty</p>
      <a href="shop.html" class="btn btn-primary rounded-pill text-uppercase fw-semibold px-4" style="font-size: 14px;">Return to shop</a>
  </div>
 `
}
// show Add To Cart Alert
function showAddToCartAlert(){
  let alertAddToCart = document.querySelector(".alert-add-to-cart")
  alertAddToCart.classList.add('show')
  setTimeout(() => {
    alertAddToCart.classList.remove('show') // Slide out the alert after 3 seconds
  }, 3500)
}
function addToCart(productId) {
    let product = products.find((p) => p.id === productId);
    let cartItem = addIeam.find(item => item.id === productId)

    if (cartItem) {
        // If the product is already in the cart, increase the quantity
        cartItem.quantity += 1
    } else {
        //   If the product is not in the cart, add it as a new item
        addIeam.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            category: product.category,
            imgPath: product.imgPath,
            wishlist: product.wishlist
        })
    }
    // Save the updated cart to localStorage
    //   addIeam = [...addIeam, product]
    localStorage.setItem("cart", JSON.stringify(addIeam))

    // count of the products
    numCount.innerHTML = addIeam.length;

    updateCartUI()  // Update the UI with the new cart state
    showAddToCartAlert()
}
///////////////////////////////////////////////////////////////////////////////
// Add product to the Wishlist
var wishlistCount = document.querySelector("#wishlist-count");
let wishlistBtn = document.querySelector("#addwishlist-btn");

// Initialize wishlist from localStorage or as an empty array
let wishlist = localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")) : [];

// Update UI based on the wishlist
if (wishlist) {
    wishlist.forEach(item => {
        let btn = document.getElementById(`wishlist-btn-${item.id}`);
        if (btn) {
            btn.classList.add('in-wishlist');
        }
    });
    if (wishlistCount) {
        wishlistCount.innerHTML = wishlist.length;
    }
}

function addToWishlist(productId) {
    // Ensure `products` is defined and contains items
    if (!Array.isArray(products)) {
        console.error('Products array is not defined or is not an array');
        return;
    }

    let wishlistProducts = products.find(item => item.id === productId);
    let wishlistItem = wishlist.find(item => item.id === productId);
    
    // Find the button element
    let button = document.getElementById(`wishlist-btn-${productId}`);
    if (!button) {
        console.error(`Button with ID wishlist-btn-${productId} not found`);
        return;
    }

    if (wishlistItem) {
        // Remove the product from the wishlist
        const productIndex = wishlist.findIndex(item => item.id === productId);
        if (productIndex !== -1) {
            wishlist.splice(productIndex, 1); // Remove the product from the array
            button.classList.remove('in-wishlist');
        }
    } else {
        // Add the product to the wishlist
        if (wishlistProducts) {
            wishlist.push({
                id: wishlistProducts.id,
                name: wishlistProducts.name,
                price: wishlistProducts.price,
                quantity: wishlistProducts.quantity,
                category: wishlistProducts.category,
                imgPath: wishlistProducts.imgPath,
                wishlist: true
            });
            button.classList.add('in-wishlist');
        } else {
            console.error(`Product with ID ${productId} not found in products array`);
        }
    }
    
    // Save the updated wishlist to localStorage
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    
    // Update the wishlist count
    if (wishlistCount) {
        wishlistCount.innerHTML = wishlist.length;
    }
}
///////////////////////////////////////////////////////////////////////////////
// quantity
function increaseQuantity(productId) {
    const cartItem = addIeam.find((item) => item.id === productId)
    if (cartItem) {
        cartItem.quantity += 1
        localStorage.setItem("cart", JSON.stringify(addIeam))
        updateCartUI()
    }
}
function decreaseQuantity(productId) {
    const cartItem = addIeam.find((item) => item.id === productId)
    if (cartItem) {
        cartItem.quantity -= 1
        if (cartItem.quantity === 0) {
            addIeam = addIeam.filter((item) => item.id !== productId)
        }
        localStorage.setItem("cart", JSON.stringify(addIeam))
        updateCartUI()
    }
}
function updateCartUI() {
    addcart.innerHTML = ''
    addIeam.forEach(item => {
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
    });
    if (addIeam.length === 0){
      addcart.innerHTML = `
      <div class="empty-cart text-center mt-3" style="width: 320px;">
          <i class="bi bi-cart-x text-secondary" style="font-size: 60px;"></i>
          <p class="text-secondary" style="font-size: 15px;">You cart is empty</p>
          <a href="shop.html" class="btn btn-primary rounded-pill text-uppercase fw-semibold px-4" style="font-size: 14px;">Return to shop</a>
      </div>
     `
    }
    // Update count of the products
    numCount.innerHTML = addIeam.length;
}
////////////////////////////////////////////////////////////////
// Search
let searchMode = 'title'
function getSearchMood(id){
  let search = document.getElementById("search")
  let searchBar = document.querySelector(".search-bar .dropdown-toggle")
    if (id == 'searchTitle'){
        searchMode = 'title';
        searchBar.innerHTML = 'Searsh by Name'
      } else {
        searchMode = 'category';
        searchBar.innerHTML = 'Searsh by Category'
    }
    search.placeholder = 'Search by ' + searchMode
    search.focus()
    search.value = '';
    drawItems()
  }

function searchData(value){
    let allProducts = '';
    for(let i=0; i < products.length; i++){
     if (searchMode == 'title'){
          if(products[i].name.toLowerCase().includes(value.toLowerCase()) 
               || products[i].name.toUpperCase().includes(value.toUpperCase())){
                allProducts += `
              <div class="col-lg-4 col-sm-6 col-12">
                            <div class="product-item">
                                <div class="img-product">
                                  <img src="images/${products[i].imgPath}" alt="product" class="w-100" style="height: 330.77px;">
                                  <span class="offer">10% OFF</span>
                                  <div class="overlay-product">
                                    <img src="images/${products[i].imgPath}" alt="product"  class="w-100" style="height: 330.77px;">
                                    <ul class="list-over">
                                      <li>
                                        <a id="wishlist-btn-${products[i].id}" class="wishlist-btn" data-product-id="${products[i].id}" onClick=addToWishlist(${products[i].id})>
                                          <i class="fa-regular fa-heart heart-empty d-none"></i>
                                           <i class="fa-solid fa-heart heart-solid"></i>
                                        </a>
                                        <span class="caption-item">Add to Wishlist</span>
                                      </li>
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
                                        <a data-product-id id="addcart-btn" onClick=addToCart(${products[i].id})>
                                           <i class="fa-solid fa-cart-plus"></i>
                                        </a>
                                        <span class="caption-item">Add to Cart</span>
                                      </li>
                                    </ul>
                                    <span class="sale">On Sale!</span>
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
                                    <a href="#">${products[i].name}</a>
                                  </h5>
                                  <div class="price-priduct">
                                    <del>$110.00</del> $${products[i].price}
                                  </div>
                                </div>
                              </div>
                        </div>
          `;
            }
     } else {
      if(products[i].category.toLowerCase().includes(value.toLowerCase()) 
         || products[i].category.toUpperCase().includes(value.toUpperCase())){
          allProducts += `
        <div class="col-lg-4 col-sm-6 col-12">
                      <div class="product-item">
                          <div class="img-product">
                            <img src="images/${products[i].imgPath}" alt="product" class="w-100" style="height: 330.77px;">
                            <span class="offer">10% OFF</span>
                            <div class="overlay-product">
                              <img src="images/${products[i].imgPath}" alt="product"  class="w-100" style="height: 330.77px;">
                              <ul class="list-over">
                                <li>
                                  <a id="wishlist-btn-${products[i].id}" class="wishlist-btn" data-product-id="${products[i].id}" onClick=addToWishlist(${products[i].id})>
                                    <i class="fa-regular fa-heart heart-empty d-none"></i>
                                     <i class="fa-solid fa-heart heart-solid"></i>
                                  </a>
                                  <span class="caption-item">Add to Wishlist</span>
                                </li>
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
                                  <a data-product-id id="addcart-btn" onClick=addToCart(${products[i].id})>
                                     <i class="fa-solid fa-cart-plus"></i>
                                  </a>
                                  <span class="caption-item">Add to Cart</span>
                                </li>
                              </ul>
                              <span class="sale">On Sale!</span>
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
                              <a href="#">${products[i].name}</a>
                            </h5>
                            <div class="price-priduct">
                              <del>$110.00</del> $${products[i].price}
                            </div>
                          </div>
                        </div>
                  </div>
  `;
      }
}
    }
    document.querySelector("#products") .innerHTML = allProducts
}
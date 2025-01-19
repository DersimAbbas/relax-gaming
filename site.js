import gamingProducts from "./products.js"


let cart = [];

function loadProducts () {
    const headsetsProducts = document.getElementById("headsets-products");
    const KeyboardProducts = document.getElementById("keyboards-products");
    const mouseProducts = document.getElementById("mouse-products");
    const chairProducts = document.getElementById("gaming-chair-products");

    gamingProducts.forEach((product) => {
        switch (product.category){
            case "Keyboards":
                KeyboardProducts.innerHTML += createCard(product);
                break;
            case "Mouse":
                mouseProducts.innerHTML += createCard(product);
                break;
            case "Gaming-chair":
                chairProducts.innerHTML += createCard(product);
                break;
            case "Headsets":
                headsetsProducts.innerHTML += createCard(product);
                break;

            default:
                break;

        }
        
            
    })
}


function addToCart(productId) {
    const product = gamingProducts.find((p) => p.productId === productId); // Find by productId
    if (product) {
        cart.push(product);
        updateCartIcon();
        console.log(product.name);
        console.log(cart);
        
    } else {
        console.error("Product not found for productId:", productId); // Debugging
        console.log("error.");
        alert("error", productId);
    }
}


function createCard(product){
    return  `
    <div class="col-12 col-md-6 col-lg-2">
    <div class="card card-products h-100">
    <img src="${product.image}" class="card-img-top mx-auto">
    <div class="card-body d-flex flex-column mb-3 align-items-center">
    <h5 style="font-weight: bolder;">${product.name}</h5>
    <p class="card-text" style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"></p>
    <button onclick="addToCart(${product.productId})" class="btn btn-success btn-add-to-cart">Add to cart</button>
    
    </div>
    </div>
    </div>
    `;
}
  function updateCartIcon() {
      const cartCount = document.getElementById("cart-count");
      cartCount.innerText = cart.length; // Update the count
    }
    
    function populateCartModal() {
        const cartModalBody = document.getElementById("cart-modal-body");
        cartModalBody.innerHTML = ""; // Clear previous items
        
        if (cart.length === 0) {
            cartModalBody.innerHTML = "<p>Your cart is empty!</p>";
            return;
        }
        
        // Populate items
        cart.forEach((item, index) => {
            const itemHtml = `
            <div class="cart-item d-flex justify-content-between align-items-center">
            <div class="cart-item-info">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
            <span>${item.name}</span>
            </div>
            <div>
            <span>${item.price}:-</span>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.productId})">Remove</button>
            </div>
            </div>
            <hr>
            `;
            cartModalBody.innerHTML += itemHtml;
        });
    }

    function removeFromCart(productId) {
        // Filter out the product with the matching productId
        cart = cart.filter((product) => product.productId !== productId);
        updateCartIcon(); // Update the cart count
        populateCartModal(); // Re-render the modal
      }

const cartButton = document.getElementById("user-cart");

cartButton.addEventListener("click", () => {
    populateCartModal();
})

window.onload = loadProducts;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
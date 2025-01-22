import gamingProducts from "./products.js"


let cartItem = [];


function loadServicesFromStorage() {
    const cartString = localStorage.getItem("cartItem");
    if (cartString) {
        cartItem = JSON.parse(cartString);
        updateCartIcon();
    }
};

function loadProducts() {
    loadServicesFromStorage();
    const headsetsProducts = document.getElementById("headsets-products");
    const KeyboardProducts = document.getElementById("keyboards-products");
    const mouseProducts = document.getElementById("mouse-products");
    const chairProducts = document.getElementById("gaming-chair-products");
    gamingProducts.forEach((product) => {
        switch (product.category) {
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

let nextCartId = 0;
function addToCart(productId) {
    const product = gamingProducts.find((p) => p.productId === productId); // Find by productId
    if (product) {

        let cartProduct = { ...product, productId: ++nextCartId };

        cartItem.push(cartProduct);
        updateCartIcon();
        console.log(product.name);
        console.log(cartItem);
        saveCartToStorage();

    } else {
        console.error("Product not found for productId:", productId); // Debugging
        console.log("error.");
        alert("error", productId);
    }

}


function createCard(product) {

    const formattedName = product.name.split(' ').length > 1
        ? `${product.name.split(' ')[0]}<br>${product.name.split(' ').slice(1).join(' ')}`
        : product.name;
    return `
    <div class="col-12 col-md-6 col-lg-2">
    <div class="card card-products h-100">
    <img src="${product.image}" class="card-img-top mx-auto">
    <div class="card-body d-flex flex-column mb-3 align-items-center">
    <h5 style="font-weight: bolder;">${formattedName}</h5>
    <p class="card-text" style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"></p>
    <button onclick="addToCart(${product.productId})" class="btn btn-success btn-add-to-cart">Add to cart</button>
    
    </div>
    </div>
    </div>
    `;
}
function updateCartIcon() {
    const cartCount = document.getElementById("cart-count");
    cartCount.innerText = cartItem.length; // Update the count
}

function saveCartToStorage() {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
}


function populateCartModal() {
    const cartModalBody = document.getElementById("cart-modal-body");
    cartModalBody.innerHTML = ""; // Clear previous items
    if (cartItem.length === 0) {
        cartModalBody.innerHTML = "<p>Your cart is empty!</p>";
        checkoutButton.style.display = "none";
        return;
    }
    checkoutButton.style.display = "block";
    // Populate items
    cartItem.forEach((item, index) => {
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
    let totalPrice = cartItem.reduce((total, item) => total + item.price, 0);
    const totalHtml = `
        <div class="cart-total d-flex justify-content-between align-items-center mt-3">
            <span><strong>Total:</strong></span>
            <span><strong>${totalPrice}:-</strong></span>
        </div>
    `;
    cartModalBody.innerHTML += totalHtml;
}

function removeFromCart(productId) {
    // Filter out the product with the matching productId
    cartItem = cartItem.filter((product) => product.productId !== productId);
    populateCartModal(); // Re-render the modal
    updateCartIcon(); // Update the cart count
    saveCartToStorage();
}
function clearCart() {
    cartItem = [];
    updateCartIcon();
    saveCartToStorage();
  };
const cartButton = document.getElementById("user-cart");
const checkoutButton = document.getElementById("checkout-btn");
cartButton.addEventListener("click", () => {
    populateCartModal();
})
checkoutButton.addEventListener("click", () => {
    if (cartItem.length > 0) {
        const cartModalBody = document.getElementById("cart-modal-body");
        cartModalBody.innerHTML = `
            <div class="text-center">
                <p>Thanks for the purchase and have a nice day!</p>
            </div>
        `;
      clearCart();
    
    }
    checkoutButton.style.display = "none";    
      
});


window.onload = loadProducts;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;

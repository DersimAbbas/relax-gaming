const cartItems = []; // Stores cart items

// Function to add item to the cart
function addToCart(itemName, itemPrice) {
    cartItems.push({ name: itemName, price: itemPrice });
    updateCart();
}

// Function to update the cart dropdown
function updateCart() {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.innerHTML = ''; // Clear previous items

    let totalPrice = 0;

    // Populate dropdown with items
    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a class="dropdown-item" href="#">${item.name} - $${item.price.toFixed(2)}</a>`;
        cartDropdown.appendChild(listItem);
        totalPrice += item.price;
    });

    // Add divider and total price
    if (cartItems.length > 0) {
        const divider = document.createElement('li');
        divider.innerHTML = '<hr class="dropdown-divider">';
        cartDropdown.appendChild(divider);

        const totalItem = document.createElement('li');
        totalItem.innerHTML = `<a class="dropdown-item" href="#"><strong>Total: $${totalPrice.toFixed(2)}</strong></a>`;
        cartDropdown.appendChild(totalItem);
    } else {
        // Display "Cart is empty" if no items
        const emptyMessage = document.createElement('li');
        emptyMessage.innerHTML = '<a class="dropdown-item" href="#">Cart is empty</a>';
        cartDropdown.appendChild(emptyMessage);
    }
}
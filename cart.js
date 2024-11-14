// Function to get cart items from localStorage
function getCartItems() {
  return JSON.parse(localStorage.getItem("cartItems")) || [];
}

// Function to display cart items
function displayCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const items = getCartItems();

  // Clear previous items
  cartItemsContainer.innerHTML = "";

  let total = 0;
  items.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
    cartItemsContainer.appendChild(itemElement);

    // Calculate total
    total += item.price * item.quantity;
  });

  // Update total
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;

  // Debugging: Log cart items to verify display
  console.log("Displaying Cart Items:", items);
}

// Display cart items on page load
document.addEventListener("DOMContentLoaded", displayCartItems);
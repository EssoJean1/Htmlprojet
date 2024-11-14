document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".product-item button");

  buttons.forEach(button => {
    button.addEventListener("click", (event) => {
      const productElement = event.target.closest(".product-item");
      const productName = productElement.querySelector("h3").textContent;
      const productPrice = parseFloat(productElement.querySelector("p").textContent.replace('$', ''));

      // Get the existing cart items from localStorage
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const existingItemIndex = cartItems.findIndex(item => item.name === productName);

      if (existingItemIndex > -1) {
        // If item exists, increase quantity
        cartItems[existingItemIndex].quantity += 1;
      } else {
        // Add new item with a quantity of 1
        cartItems.push({ name: productName, price: productPrice, quantity: 1 });
      }

      // Update localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Trigger display update to reflect the cart changes
      displayCartItems();

      // Debugging: Log the updated cart items
      console.log("Cart Items:", cartItems);
      alert("Product added to cart!");
    });
  });
});
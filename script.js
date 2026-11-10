
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 2499,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 4,
        name: "Backpack",
        price: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },
    {
        id: 5,
        name: "Camera",
        price: 4999,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
    },
    {
        id: 6,
        name: "Sunglasses",
        price: 799,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    }
];

let cart = [];

const productsContainer = document.getElementById("products-container");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPrice = document.getElementById("total-price");
const modal = document.getElementById("checkout-modal");

function displayProducts() {
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>Quality product at an affordable price.</p>
            <div class="price">₹${product.price.toLocaleString("en-IN")}</div>
            <button class="add-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join("");
}

function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartCount.textContent = count;
    totalPrice.textContent = total.toLocaleString("en-IN");

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <p>${item.name} × ${item.quantity}</p>
            <p>₹${(item.price * item.quantity).toLocaleString("en-IN")}</p>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">
                Remove
            </button>
        </div>
    `).join("");
}

function openCheckout() {
    if (cart.length === 0) {
        alert("Please add products to your cart first!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("order-details").innerHTML = cart.map(item => `
        <div class="order-row">
            <span>${item.name} × ${item.quantity}</span>
            <strong>₹${(item.price * item.quantity).toLocaleString("en-IN")}</strong>
        </div>
    `).join("");

    document.getElementById("modal-total").textContent =
        total.toLocaleString("en-IN");

    modal.classList.add("show");
}

document.getElementById("checkout-btn").addEventListener("click", openCheckout);

document.getElementById("close-modal").addEventListener("click", () => {
    modal.classList.remove("show");
});

document.getElementById("confirm-btn").addEventListener("click", () => {
    alert("Order preview completed! This is a demo checkout.");
    cart = [];
    updateCart();
    modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});

displayProducts();
updateCart();

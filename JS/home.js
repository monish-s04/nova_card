let l = document.getElementById("l");
let r = document.getElementById('r');
l.addEventListener("click", () => {
    window.location.href = "../HTML/login.html";
})
r.addEventListener("click", () => {
    window.location.href = "../HTML/register.html";
})

let products = [];
let filteredProducts = [];
let cart = [];

let currentPage = 1;
const itemsPerPage = 10;

const productContainer = document.getElementById("productContainer");
const pageNumber = document.getElementById("pageNumber");
const productCount = document.getElementById("productCount");

const categoryFilter = document.getElementById("categoryFilter");

const cartSidebar = document.getElementById("cartSidebar");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
    if (searchInput.style.display === "block") {
        searchInput.style.display = "none";
    } else {
        searchInput.style.display = "block";
        searchInput.style.order = "-1";
    }
});

// FETCH PRODUCTS
async function fetchProducts() {
    const response = await fetch("https://cdn.jsdelivr.net/gh/adarshahelvar/NovaCart/products.json");
    products = await response.json();

    filteredProducts = [...products];

    loadCategories();
    displayProducts();
}

fetchProducts();


// LOAD CATEGORY OPTIONS
function loadCategories() {
    let categories = [...new Set(products.map(item => item.category))];

    categories.forEach(cat => {
        let option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
}


// DISPLAY PRODUCTS
function displayProducts() {
    productContainer.innerHTML = "";

    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;

    let paginatedItems = filteredProducts.slice(start, end);

    paginatedItems.forEach(product => {
        productContainer.innerHTML += `
            <div class="ig">
                <img src="${product.image}" alt="${product.name}">
                
                <div class="ig1">
                    <p>${product.category}</p>
                    <p>⭐ ${product.rating}</p>
                </div>

                <p><b>${product.name}</b></p>
                <p>${product.description}</p>

                <div class="ig2">
                    <h3>$${product.price}</h3>
                    <button onclick="addToCart(${product.id})">Add</button>
                </div>
            </div>
        `;
    });

    pageNumber.textContent = currentPage;
    productCount.textContent = `Showing ${start + 1}-${Math.min(end, filteredProducts.length)} of ${filteredProducts.length} products`;
}


// PAGINATION
document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
        currentPage++;
        displayProducts();
    }
});

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
    }
});


// SEARCH
searchInput.addEventListener("input", () => {
    let value = searchInput.value.toLowerCase();

    filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(value)
    );

    currentPage = 1;
    displayProducts();
});


// CATEGORY FILTER
categoryFilter.addEventListener("change", () => {
    let selected = categoryFilter.value;

    if (selected === "all") {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(
            product => product.category === selected
        );
    }

    currentPage = 1;
    displayProducts();
});

//rating
const ratingFilter = document.getElementById("ratingFilter");

ratingFilter.addEventListener("change", () => {
    let selected = ratingFilter.value;

    if (selected === "all") {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(
            product => product.rating >= Number(selected)
        );
    }

    currentPage = 1;
    displayProducts();
});


function addToCart(id) {
    let existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        let product = products.find(item => item.id === id);
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    cartSidebar.style.right = "0";
}


function increaseQty(id) {
    let item = cart.find(item => item.id === id);
    item.quantity++;
    updateCart();
}


function decreaseQty(id) {
    let item = cart.find(item => item.id === id);

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        removeItem(id);
    }

    updateCart();
}


function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}


function clearCart() {
    cart = [];
    updateCart();
}


function updateCart() {
    cartItems.innerHTML = "";

    let subtotal = 0;
    const shipping = 8.50;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        cartItems.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">
                <h4>${item.name}</h4>
                <p>$${item.price} each</p>

                <div class="qty-controls">
                    <button onclick="decreaseQty(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQty(${item.id})">+</button>
                </div>
            </div>

            <div class="cart-right">
                <button onclick="removeItem(${item.id})" class="delete-btn">🗑</button>
                <h4>$${(item.price * item.quantity).toFixed(2)}</h4>
            </div>
        </div>
        `;
    });

    let total = subtotal + shipping;

    cartTotal.innerHTML = `
        <div class="bill-row">
            <p>Subtotal</p>
            <span>$${subtotal.toFixed(2)}</span>
        </div>

        <div class="bill-row">
            <p>Estimated shipping</p>
            <span>$${shipping.toFixed(2)}</span>
        </div>

        <div class="bill-row total-row">
            <h3>Total</h3>
            <h3>$${total.toFixed(2)}</h3>
        </div>

        <button class="clear-btn" onclick="clearCart()">Clear cart</button>
        <button class="checkout-btn">Checkout</button>
    `;
}


// OPEN CART
document.querySelector(".ncb").addEventListener("click", () => {
    cartSidebar.style.right = "0";
});


// CLOSE CART
document.getElementById("closeCart").addEventListener("click", () => {
    cartSidebar.style.right = "-400px";
});
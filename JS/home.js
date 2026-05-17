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


// ADD TO CART
function addToCart(id) {
    let item = products.find(product => product.id === id);

    cart.push(item);
    updateCart();

    cartSidebar.style.right = "0";
}


// UPDATE CART
function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" width="50">
                <div>
                    <p>${item.name}</p>
                    <p>$${item.price}</p>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = total.toFixed(2);
}


// OPEN CART
document.querySelector(".ncb").addEventListener("click", () => {
    cartSidebar.style.right = "0";
});


// CLOSE CART
document.getElementById("closeCart").addEventListener("click", () => {
    cartSidebar.style.right = "-400px";
});
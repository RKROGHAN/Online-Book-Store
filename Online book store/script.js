// Global variables
let allBooks = [];
let filteredBooks = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
async function initializeApp() {
    // Check authentication for protected pages
    checkAuth();
    
    await loadBooks();
    updateCartCount();
    updateUserMenu();
    
    // Initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        // Sort books alphabetically by title by default
        const sortedBooks = [...allBooks].sort((a, b) => a.title.localeCompare(b.title));
        displayBooks(sortedBooks);
        filteredBooks = sortedBooks;
        setupSearchAndFilter();
    } else if (currentPage === 'book-details.html') {
        // Handled by inline script
    } else if (currentPage === 'cart.html') {
        // Handled by inline script
    } else if (currentPage === 'checkout.html') {
        // Handled by inline script
    } else if (currentPage === 'orders.html') {
        // Handled by inline script
    } else if (currentPage === 'account.html') {
        // Handled by inline script
    } else if (currentPage === 'login.html' || currentPage === 'register.html') {
        // Auth pages handle their own initialization
    }
}

// Default books array (fallback)
const defaultBooks = [
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 12.99,
    "category": "Fiction",
    "description": "A classic American novel set in the Jazz Age, following Nick Carraway's observations of his mysterious neighbor Jay Gatsby and Gatsby's obsession with Daisy Buchanan.",
    "image": "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    "rating": 4.5,
    "reviews": 1250,
    "stock": 50,
    "isbn": "978-0-7432-7356-5",
    "pages": 180,
    "year": 1925
  },
  {
    "id": 2,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "price": 11.99,
    "category": "Fiction",
    "description": "A gripping tale of racial injustice and childhood innocence in the American South, told through the eyes of Scout Finch.",
    "image": "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
    "rating": 4.8,
    "reviews": 2100,
    "stock": 75,
    "isbn": "978-0-06-112008-4",
    "pages": 376,
    "year": 1960
  },
  {
    "id": 3,
    "title": "1984",
    "author": "George Orwell",
    "price": 13.99,
    "category": "Dystopian",
    "description": "A dystopian social science fiction novel about totalitarian surveillance and thought control in a future society.",
    "image": "https://covers.openlibrary.org/b/isbn/9780452284234-L.jpg",
    "rating": 4.7,
    "reviews": 1850,
    "stock": 60,
    "isbn": "978-0-452-28423-4",
    "pages": 328,
    "year": 1949
  },
  {
    "id": 4,
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "price": 10.99,
    "category": "Romance",
    "description": "A romantic novel of manners that follows the character development of Elizabeth Bennet, the dynamic protagonist.",
    "image": "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
    "rating": 4.6,
    "reviews": 1650,
    "stock": 80,
    "isbn": "978-0-14-143951-8",
    "pages": 432,
    "year": 1813
  },
  {
    "id": 5,
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "price": 12.49,
    "category": "Fiction",
    "description": "A controversial novel about teenage rebellion and alienation, following Holden Caulfield's experiences in New York City.",
    "image": "https://covers.openlibrary.org/b/isbn/9780316769480-L.jpg",
    "rating": 4.3,
    "reviews": 980,
    "stock": 45,
    "isbn": "978-0-316-76948-0",
    "pages": 234,
    "year": 1951
  },
  {
    "id": 6,
    "title": "Lord of the Flies",
    "author": "William Golding",
    "price": 11.49,
    "category": "Fiction",
    "description": "A story about a group of British boys stranded on an uninhabited island and their disastrous attempt to govern themselves.",
    "image": "https://covers.openlibrary.org/b/isbn/9780571056865-L.jpg",
    "rating": 4.2,
    "reviews": 1120,
    "stock": 55,
    "isbn": "978-0-571-05686-5",
    "pages": 224,
    "year": 1954
  },
  {
    "id": 7,
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "price": 14.99,
    "category": "Fantasy",
    "description": "A fantasy novel about the adventures of hobbit Bilbo Baggins, who is hired as a burglar by a group of dwarves.",
    "image": "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
    "rating": 4.8,
    "reviews": 2400,
    "stock": 90,
    "isbn": "978-0-547-92822-7",
    "pages": 310,
    "year": 1937
  },
  {
    "id": 8,
    "title": "Harry Potter and the Philosopher's Stone",
    "author": "J.K. Rowling",
    "price": 15.99,
    "category": "Fantasy",
    "description": "The first book in the Harry Potter series, following a young wizard's first year at Hogwarts School of Witchcraft and Wizardry.",
    "image": "https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg",
    "rating": 4.9,
    "reviews": 3500,
    "stock": 100,
    "isbn": "978-0-7475-3269-6",
    "pages": 223,
    "year": 1997
  },
  {
    "id": 9,
    "title": "The Da Vinci Code",
    "author": "Dan Brown",
    "price": 13.49,
    "category": "Mystery",
    "description": "A mystery thriller novel about symbologist Robert Langdon who investigates a murder in the Louvre Museum.",
    "image": "https://covers.openlibrary.org/b/isbn/9780385504205-L.jpg",
    "rating": 4.1,
    "reviews": 1450,
    "stock": 65,
    "isbn": "978-0-385-50420-5",
    "pages": 454,
    "year": 2003
  },
  {
    "id": 10,
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "price": 12.99,
    "category": "Philosophy",
    "description": "A philosophical novel about a young Andalusian shepherd who travels from Spain to Egypt in search of treasure.",
    "image": "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
    "rating": 4.5,
    "reviews": 2200,
    "stock": 70,
    "isbn": "978-0-06-112008-4",
    "pages": 163,
    "year": 1988
  },
  {
    "id": 11,
    "title": "Sapiens: A Brief History of Humankind",
    "author": "Yuval Noah Harari",
    "price": 16.99,
    "category": "History",
    "description": "An exploration of how Homo sapiens conquered the world through cognitive, agricultural, and scientific revolutions.",
    "image": "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
    "rating": 4.6,
    "reviews": 1800,
    "stock": 85,
    "isbn": "978-0-06-231609-7",
    "pages": 443,
    "year": 2011
  },
  {
    "id": 12,
    "title": "The Kite Runner",
    "author": "Khaled Hosseini",
    "price": 13.99,
    "category": "Fiction",
    "description": "A powerful story of friendship, betrayal, and redemption set against the backdrop of Afghanistan's tumultuous history.",
    "image": "https://covers.openlibrary.org/b/isbn/9781594480003-L.jpg",
    "rating": 4.7,
    "reviews": 1950,
    "stock": 58,
    "isbn": "978-1-59448-000-3",
    "pages": 371,
    "year": 2003
  }
];

// Load books from JSON file
async function loadBooks() {
    // First, try to load from localStorage (fastest)
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        try {
            allBooks = JSON.parse(storedBooks);
            filteredBooks = [...allBooks];
            // Still try to fetch to update if needed, but don't wait
            fetchBooksFromFile();
            return;
        } catch (e) {
            console.error('Error parsing stored books:', e);
        }
    }
    
    // Try to fetch from file
    try {
        const response = await fetch('books.json');
        if (response.ok) {
            const fetchedBooks = await response.json();
            allBooks = fetchedBooks;
            filteredBooks = [...fetchedBooks];
            localStorage.setItem('books', JSON.stringify(allBooks));
            return;
        }
    } catch (error) {
        console.log('Fetch failed, using default books:', error);
    }
    
    // Fallback to default books
    if (allBooks.length === 0) {
        allBooks = [...defaultBooks];
        filteredBooks = [...defaultBooks];
        localStorage.setItem('books', JSON.stringify(allBooks));
    }
}

// Try to fetch books from file (non-blocking)
async function fetchBooksFromFile() {
    try {
        const response = await fetch('books.json');
        if (response.ok) {
            const fetchedBooks = await response.json();
            // Merge with existing, preserving stock
            const storedBooks = JSON.parse(localStorage.getItem('books') || '[]');
            allBooks = fetchedBooks.map(book => {
                const stored = storedBooks.find(b => b.id === book.id);
                return stored ? { ...book, stock: stored.stock } : book;
            });
            filteredBooks = [...allBooks];
            localStorage.setItem('books', JSON.stringify(allBooks));
        }
    } catch (error) {
        // Silently fail - we already have books loaded
        console.log('Background fetch failed:', error);
    }
}

// Convert price to points (1 dollar = 100 points)
function priceToPoints(price) {
    return Math.round(price * 100);
}

// Format points display
function formatPoints(points) {
    return points.toLocaleString() + ' points';
}

// Display books on the page
function displayBooks(books) {
    const container = document.getElementById('books-container');
    const noResults = document.getElementById('no-results');
    
    if (!container) return;
    
    if (books.length === 0) {
        container.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        return;
    }
    
    if (noResults) noResults.style.display = 'none';
    
    container.innerHTML = books.map(book => {
        const points = priceToPoints(book.price);
        return `
        <div class="book-card" onclick="viewBookDetails(${book.id})">
            <img src="${book.image}" alt="${book.title}" class="book-image" onerror="this.src='https://via.placeholder.com/300x400?text=Book+Cover'">
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <div class="book-rating">
                    <span class="stars">${generateStars(book.rating)}</span>
                    <span>${book.rating} (${book.reviews} reviews)</span>
                </div>
                <div class="book-price">${formatPoints(points)}</div>
                <div class="book-actions">
                    <button class="btn btn-primary btn-small" onclick="event.stopPropagation(); addToCart(${book.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    }).join('');
}

// Generate star rating display
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '½';
    stars += '☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0));
    return stars;
}

// Setup search and filter functionality
function setupSearchAndFilter() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', applyFilters);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }
}

// Apply search and filter
function applyFilters() {
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const category = document.getElementById('category-filter')?.value || '';
    const sortBy = document.getElementById('sort-filter')?.value || 'default';
    
    filteredBooks = allBooks.filter(book => {
        const matchesSearch = !searchTerm || 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.isbn.includes(searchTerm);
        
        const matchesCategory = !category || book.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    // Sort books
    switch(sortBy) {
        case 'price-low':
            filteredBooks.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredBooks.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredBooks.sort((a, b) => b.rating - a.rating);
            break;
        case 'title':
            filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            // Keep original order
            break;
    }
    
    displayBooks(filteredBooks);
}

// View book details
function viewBookDetails(bookId) {
    window.location.href = `book-details.html?id=${bookId}`;
}

// Load book details page
function loadBookDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = parseInt(urlParams.get('id'));
    
    if (!bookId) {
        window.location.href = 'index.html';
        return;
    }
    
    const book = allBooks.find(b => b.id === bookId);
    
    if (!book) {
        window.location.href = 'index.html';
        return;
    }
    
    const container = document.getElementById('book-details-container');
    if (!container) return;
    
    const stockClass = book.stock > 20 ? 'stock-available' : 
                      book.stock > 0 ? 'stock-low' : 'stock-unavailable';
    const stockText = book.stock > 20 ? 'In Stock' : 
                     book.stock > 0 ? 'Low Stock' : 'Out of Stock';
    
    container.innerHTML = `
        <div class="book-details-content">
            <div>
                <img src="${book.image}" alt="${book.title}" class="book-details-image" onerror="this.src='https://via.placeholder.com/300x400?text=Book+Cover'">
            </div>
            <div class="book-details-info">
                <h1>${book.title}</h1>
                <p class="book-details-author">by ${book.author}</p>
                <div class="book-details-rating">
                    <span class="stars">${generateStars(book.rating)}</span>
                    <span>${book.rating} out of 5 (${book.reviews} reviews)</span>
                </div>
                <div class="book-details-price">${formatPoints(priceToPoints(book.price))}</div>
                <div class="stock-info ${stockClass}">${stockText} (${book.stock} available)</div>
                <p class="book-details-description">${book.description}</p>
                <div class="book-details-meta">
                    <div class="meta-item">
                        <span class="meta-label">ISBN</span>
                        <span class="meta-value">${book.isbn}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Pages</span>
                        <span class="meta-value">${book.pages}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Year</span>
                        <span class="meta-value">${book.year}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Category</span>
                        <span class="meta-value">${book.category}</span>
                    </div>
                </div>
                <div class="book-actions">
                    <button class="btn btn-primary btn-large" onclick="addToCart(${book.id})" ${book.stock === 0 ? 'disabled' : ''}>
                        ${book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add to recently viewed
    addToRecentlyViewed(bookId);
}

// Cart Management
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(bookId) {
    const book = allBooks.find(b => b.id === bookId);
    if (!book) {
        alert('Book not found!');
        return;
    }
    
    if (book.stock === 0) {
        alert('This book is out of stock!');
        return;
    }
    
    const cart = getCart();
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        if (existingItem.quantity >= book.stock) {
            alert(`Only ${book.stock} copies available in stock!`);
            return;
        }
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            image: book.image,
            quantity: 1
        });
    }
    
    saveCart(cart);
    
    // Show success message
    showNotification('Book added to cart!', 'success');
}

function removeFromCart(bookId) {
    const cart = getCart();
    const newCart = cart.filter(item => item.id !== bookId);
    saveCart(newCart);
    
    if (window.location.pathname.includes('cart.html')) {
        loadCart();
    }
}

function updateCartQuantity(bookId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === bookId);
    
    if (!item) return;
    
    const book = allBooks.find(b => b.id === bookId);
    if (!book) {
        alert('Book not found!');
        return;
    }
    
    if (quantity > book.stock) {
        alert(`Only ${book.stock} copies available in stock!`);
        quantity = book.stock;
    }
    
    if (quantity <= 0) {
        removeFromCart(bookId);
        return;
    }
    
    item.quantity = quantity;
    saveCart(cart);
    
    if (window.location.pathname.includes('cart.html')) {
        loadCart();
    }
}

function proceedToCheckout() {
    if (!isLoggedIn()) {
        if (confirm('Please login to proceed to checkout. Would you like to login now?')) {
            window.location.href = 'login.html';
        }
        return;
    }
    window.location.href = 'checkout.html';
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
    });
}

function loadCart() {
    const cart = getCart();
    const container = document.getElementById('cart-container');
    const emptyCart = document.getElementById('empty-cart');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '';
        if (emptyCart) emptyCart.style.display = 'block';
        return;
    }
    
    if (emptyCart) emptyCart.style.display = 'none';
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    container.innerHTML = `
        <div class="cart-items">
            ${cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/300x400?text=Book+Cover'">
                    <div class="cart-item-info">
                        <h3>${item.title}</h3>
                        <p>by ${item.author}</p>
                        <div class="cart-item-quantity">
                            <label>Quantity:</label>
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateCartQuantity(${item.id}, parseInt(this.value))">
                                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            </div>
                        </div>
                        <button class="btn btn-danger btn-small" onclick="removeFromCart(${item.id})" style="margin-top: 1rem;">Remove</button>
                    </div>
                    <div class="cart-item-price">${formatPoints(priceToPoints(item.price * item.quantity))}</div>
                </div>
            `).join('')}
        </div>
        <div class="cart-totals">
            <div class="total-row">
                <span>Subtotal:</span>
                <span>${formatPoints(priceToPoints(subtotal))}</span>
            </div>
            <div class="total-row total-final">
                <span>Total:</span>
                <span>${formatPoints(priceToPoints(subtotal))}</span>
            </div>
            <button onclick="proceedToCheckout()" class="btn btn-primary btn-large" style="width: 100%; margin-top: 1.5rem; display: block; text-align: center;">Proceed to Checkout</button>
        </div>
    `;
}

// Checkout functionality
function loadCheckout() {
    const cart = getCart();
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    const orderItemsContainer = document.getElementById('order-items');
    if (!orderItemsContainer) return;
    
    // Get user points
    const user = getCurrentUser();
    const userPoints = user ? (user.points || 0) : 0;
    document.getElementById('user-points').textContent = userPoints;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    // Calculate max points that can be used (max 80% of total in points)
    const totalPoints = priceToPoints(total);
    const maxPointsUsage = Math.min(userPoints, Math.floor(totalPoints * 0.8));
    document.getElementById('max-points-usage').textContent = formatPoints(maxPointsUsage);
    
    orderItemsContainer.innerHTML = cart.map(item => `
        <div class="order-item">
            <div class="order-item-info">
                <h4>${item.title}</h4>
                <p>by ${item.author} × ${item.quantity}</p>
            </div>
            <div class="order-item-price">${formatPoints(priceToPoints(item.price * item.quantity))}</div>
        </div>
    `).join('');
    
    updateCheckoutTotals(subtotal, shipping, tax, total, 0);
    
    // Load saved account info if available
    loadAccountInfoToCheckout();
}

function updateCheckoutTotals(subtotal, shipping, tax, total, pointsUsed) {
    const pointsDiscount = pointsUsed; // pointsUsed is already in points
    const finalTotalPoints = Math.max(0, priceToPoints(total) - pointsDiscount);
    
    document.getElementById('subtotal').textContent = formatPoints(priceToPoints(subtotal));
    document.getElementById('shipping').textContent = formatPoints(priceToPoints(shipping));
    document.getElementById('tax').textContent = formatPoints(priceToPoints(tax));
    
    if (pointsUsed > 0) {
        document.getElementById('points-discount-row').style.display = 'flex';
        document.getElementById('points-discount').textContent = `-${formatPoints(pointsDiscount)}`;
    } else {
        document.getElementById('points-discount-row').style.display = 'none';
    }
    
    document.getElementById('total').textContent = formatPoints(finalTotalPoints);
    document.getElementById('remaining-balance').textContent = formatPoints(finalTotalPoints);
}

function togglePointsUsage() {
    const usePoints = document.getElementById('use-points').checked;
    const pointsUsageDiv = document.getElementById('points-usage');
    
    if (usePoints) {
        pointsUsageDiv.style.display = 'block';
        updateTotalsWithPoints();
    } else {
        pointsUsageDiv.style.display = 'none';
        const cart = getCart();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 5.99;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;
        updateCheckoutTotals(subtotal, shipping, tax, total, 0);
    }
}

function updateTotalsWithPoints() {
    const cart = getCart();
    const user = getCurrentUser();
    const userPoints = user ? (user.points || 0) : 0;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    const usePoints = document.getElementById('use-points').checked;
    if (usePoints) {
        const maxPointsUsage = Math.min(userPoints, Math.floor(total * 80));
        updateCheckoutTotals(subtotal, shipping, tax, total, maxPointsUsage);
    } else {
        updateCheckoutTotals(subtotal, shipping, tax, total, 0);
    }
}

function loadAccountInfoToCheckout() {
    const accountInfo = getAccountInfo();
    if (accountInfo.name) {
        document.getElementById('full-name').value = accountInfo.name;
    }
    if (accountInfo.email) {
        document.getElementById('email').value = accountInfo.email;
    }
    if (accountInfo.phone) {
        document.getElementById('phone').value = accountInfo.phone;
    }
    if (accountInfo.address) {
        document.getElementById('address').value = accountInfo.address;
    }
    if (accountInfo.city) {
        document.getElementById('city').value = accountInfo.city;
    }
    if (accountInfo.state) {
        document.getElementById('state').value = accountInfo.state;
    }
    if (accountInfo.zip) {
        document.getElementById('zip').value = accountInfo.zip;
    }
    if (accountInfo.country) {
        document.getElementById('country').value = accountInfo.country;
    }
}

// Redemption codes system
function getRedemptionCodes() {
    const codes = localStorage.getItem('redemptionCodes');
    return codes ? JSON.parse(codes) : [
        { code: 'WELCOME100', points: 100, used: false },
        { code: 'BOOKLOVER50', points: 50, used: false },
        { code: 'READER200', points: 200, used: false },
        { code: 'STUDENT150', points: 150, used: false },
        { code: 'BONUS300', points: 300, used: false }
    ];
}

function saveRedemptionCodes(codes) {
    localStorage.setItem('redemptionCodes', JSON.stringify(codes));
}

function redeemCode(code) {
    const codes = getRedemptionCodes();
    const redemptionCode = codes.find(c => c.code.toUpperCase() === code.toUpperCase() && !c.used);
    
    if (!redemptionCode) {
        return { success: false, message: 'Invalid or already used redemption code!' };
    }
    
    // Mark code as used
    redemptionCode.used = true;
    saveRedemptionCodes(codes);
    
    // Add points to user
    const user = getCurrentUser();
    if (user) {
        const users = getUsers();
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            users[userIndex].points = (users[userIndex].points || 0) + redemptionCode.points;
            saveUsers(users);
            
            // Update current user
            user.points = users[userIndex].points;
            setCurrentUser(user);
            
            return { success: true, points: redemptionCode.points, totalPoints: user.points };
        }
    }
    
    return { success: false, message: 'Error updating points!' };
}

function placeOrder() {
    const checkoutForm = document.getElementById('checkout-form');
    
    if (!checkoutForm.checkValidity()) {
        alert('Please fill in all required shipping fields correctly.');
        return;
    }
    
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        window.location.href = 'cart.html';
        return;
    }
    
    // Check stock availability
    for (const item of cart) {
        const book = allBooks.find(b => b.id === item.id);
        if (!book || book.stock < item.quantity) {
            alert(`${book ? book.title : 'A book'} is no longer available in the requested quantity.`);
            loadCart();
            window.location.href = 'cart.html';
            return;
        }
    }
    
    // Process redemption code if entered (optional)
    const redeemCodeInput = document.getElementById('redeem-code').value.trim();
    if (redeemCodeInput) {
        const result = redeemCode(redeemCodeInput);
        if (!result.success) {
            alert(result.message);
            return;
        } else {
            alert(`Successfully redeemed ${result.points} points! Your new balance is ${result.totalPoints} points.`);
            // Reload checkout to update points display
            loadCheckout();
            document.getElementById('redeem-code').value = '';
            return; // Let user place order after seeing the success message
        }
    }
    
    // Get form data
    const formData = {
        fullName: document.getElementById('full-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        country: document.getElementById('country').value
    };
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const tax = subtotal * 0.08;
    let total = subtotal + shipping + tax;
    
    // Apply points discount if checked
    const usePoints = document.getElementById('use-points').checked;
    let pointsUsed = 0;
    if (usePoints) {
        const user = getCurrentUser();
        const userPoints = user ? (user.points || 0) : 0;
        const totalPoints = priceToPoints(total);
        const maxPointsUsage = Math.min(userPoints, Math.floor(totalPoints * 0.8));
        pointsUsed = maxPointsUsage;
        // Convert points back to dollars for calculation (1 point = $0.01)
        total = Math.max(0, total - (pointsUsed * 0.01));
        
        // Deduct points from user
        const users = getUsers();
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            users[userIndex].points = (users[userIndex].points || 0) - pointsUsed;
            saveUsers(users);
            user.points = users[userIndex].points;
            setCurrentUser(user);
        }
    }
    
    // Create order
    const order = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        items: cart.map(item => ({
            id: item.id,
            title: item.title,
            author: item.author,
            price: item.price,
            quantity: item.quantity,
            image: item.image
        })),
        shipping: formData,
        subtotal: subtotal,
        shippingCost: shipping,
        tax: tax,
        pointsUsed: pointsUsed,
        total: total,
        status: 'processing'
    };
    
    // Save order
    const orders = getOrders();
    orders.unshift(order);
    saveOrders(orders);
    
    // Update book stock
    cart.forEach(item => {
        const book = allBooks.find(b => b.id === item.id);
        if (book) {
            book.stock -= item.quantity;
        }
    });
    localStorage.setItem('books', JSON.stringify(allBooks));
    
    // Clear cart
    saveCart([]);
    
    // Save account info for future use
    saveAccountInfo(formData);
    
    // Redirect to order confirmation
    window.location.href = `order-confirmation.html?orderId=${order.id}`;
}

// Orders management
function getOrders() {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
}

function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function loadOrders() {
    const orders = getOrders();
    const container = document.getElementById('orders-container');
    const noOrders = document.getElementById('no-orders');
    
    if (!container) return;
    
    if (orders.length === 0) {
        container.innerHTML = '';
        if (noOrders) noOrders.style.display = 'block';
        return;
    }
    
    if (noOrders) noOrders.style.display = 'none';
    
    container.innerHTML = orders.map(order => {
        const orderDate = new Date(order.date);
        const statusClass = order.status === 'delivered' ? 'status-delivered' :
                           order.status === 'shipped' ? 'status-shipped' :
                           'status-processing';
        
        return `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <div class="order-id">Order #${order.id}</div>
                        <div class="order-date">${orderDate.toLocaleDateString()} ${orderDate.toLocaleTimeString()}</div>
                    </div>
                    <div class="order-status ${statusClass}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</div>
                </div>
                <div class="order-items-list">
                    ${order.items.map(item => `
                        <div class="order-item-card">
                            <img src="${item.image}" alt="${item.title}" class="order-item-image" onerror="this.src='https://via.placeholder.com/300x400?text=Book+Cover'">
                            <div class="order-item-details">
                                <h4>${item.title}</h4>
                                <p>by ${item.author}</p>
                                <p>Quantity: ${item.quantity}</p>
                            </div>
                            <div class="order-item-total">
                                <div class="price">${formatPoints(priceToPoints(item.price * item.quantity))}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="order-summary-section">
                    <div>
                        <div>Subtotal: ${formatPoints(priceToPoints(order.subtotal))}</div>
                        <div>Shipping: ${formatPoints(priceToPoints(order.shippingCost))}</div>
                        <div>Tax: ${formatPoints(priceToPoints(order.tax))}</div>
                        ${order.pointsUsed ? `<div>Points Used: -${formatPoints(order.pointsUsed)}</div>` : ''}
                    </div>
                    <div class="order-total">Total: ${formatPoints(priceToPoints(order.total))}</div>
                </div>
            </div>
        `;
    }).join('');
}

// Account management
function getAccountInfo() {
    const accountInfo = localStorage.getItem('accountInfo');
    return accountInfo ? JSON.parse(accountInfo) : {};
}

function saveAccountInfo(info) {
    const existing = getAccountInfo();
    const updated = { ...existing, ...info };
    localStorage.setItem('accountInfo', JSON.stringify(updated));
}

function loadAccountInfo() {
    const accountInfo = getAccountInfo();
    const user = getCurrentUser();
    
    // Display points
    if (document.getElementById('account-points')) {
        const userPoints = user ? (user.points || 0) : 0;
        document.getElementById('account-points').textContent = userPoints;
    }
    
    if (document.getElementById('account-name')) {
        document.getElementById('account-name').value = accountInfo.name || (user ? user.name : '');
    }
    if (document.getElementById('account-email')) {
        document.getElementById('account-email').value = accountInfo.email || (user ? user.email : '');
    }
    if (document.getElementById('account-phone')) {
        document.getElementById('account-phone').value = accountInfo.phone || '';
    }
    if (document.getElementById('account-address')) {
        document.getElementById('account-address').value = accountInfo.address || '';
    }
    if (document.getElementById('account-city')) {
        document.getElementById('account-city').value = accountInfo.city || '';
    }
    if (document.getElementById('account-state')) {
        document.getElementById('account-state').value = accountInfo.state || '';
    }
    if (document.getElementById('account-zip')) {
        document.getElementById('account-zip').value = accountInfo.zip || '';
    }
    if (document.getElementById('account-country')) {
        document.getElementById('account-country').value = accountInfo.country || 'United States';
    }
}

function saveAccountInfoForm() {
    const name = document.getElementById('account-name').value;
    const email = document.getElementById('account-email').value;
    const phone = document.getElementById('account-phone').value;
    
    saveAccountInfo({ name, email, phone });
    showNotification('Account information saved!', 'success');
}

function saveAddressInfo() {
    const address = document.getElementById('account-address').value;
    const city = document.getElementById('account-city').value;
    const state = document.getElementById('account-state').value;
    const zip = document.getElementById('account-zip').value;
    const country = document.getElementById('account-country').value;
    
    saveAccountInfo({ address, city, state, zip, country });
    showNotification('Address information saved!', 'success');
}

// Recently viewed books
function addToRecentlyViewed(bookId) {
    let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    recentlyViewed = recentlyViewed.filter(id => id !== bookId);
    recentlyViewed.unshift(bookId);
    recentlyViewed = recentlyViewed.slice(0, 10); // Keep only last 10
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type === 'success' ? 'success-message' : 'error-message'}`;
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '10000';
    notification.style.minWidth = '300px';
    notification.style.padding = '1rem';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Authentication Functions
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        localStorage.removeItem('currentUser');
    }
}

function isLoggedIn() {
    return getCurrentUser() !== null;
}

function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

function register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    const role = document.getElementById('register-role').value;
    
    const errorDiv = document.getElementById('register-error');
    const successDiv = document.getElementById('register-success');
    
    // Validation
    if (password !== confirmPassword) {
        errorDiv.textContent = 'Passwords do not match!';
        errorDiv.style.display = 'block';
        successDiv.style.display = 'none';
        return;
    }
    
    if (password.length < 6) {
        errorDiv.textContent = 'Password must be at least 6 characters!';
        errorDiv.style.display = 'block';
        successDiv.style.display = 'none';
        return;
    }
    
    const users = getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        errorDiv.textContent = 'Email already registered!';
        errorDiv.style.display = 'block';
        successDiv.style.display = 'none';
        return;
    }
    
    // Create new user with 300 points
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password, // In real app, this would be hashed
        role: role,
        points: 300, // New users get 300 points
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    successDiv.textContent = 'Account created successfully! You received 300 welcome points! Redirecting...';
    successDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    
    // Auto login and redirect
    setTimeout(() => {
        const userWithoutPassword = { ...newUser };
        delete userWithoutPassword.password;
        setCurrentUser(userWithoutPassword);
        window.location.href = 'index.html';
    }, 1500);
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const errorDiv = document.getElementById('login-error');
    
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        errorDiv.textContent = 'Invalid email or password!';
        errorDiv.style.display = 'block';
        return;
    }
    
    // Initialize points if not exists (for old users)
    if (user.points === undefined) {
        user.points = 300;
        const userIndex = users.findIndex(u => u.id === user.id);
        users[userIndex] = user;
        saveUsers(users);
    }
    
    // Remove password from user object before storing
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    
    setCurrentUser(userWithoutPassword);
    window.location.href = 'index.html';
}

function logout() {
    setCurrentUser(null);
    window.location.href = 'index.html';
}

function checkAuth() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const authPages = ['login.html', 'register.html'];
    const guestPages = ['index.html', 'book-details.html', 'cart.html', ''];
    const protectedPages = ['checkout.html', 'orders.html', 'account.html', 'admin.html'];
    
    // Allow guest access to browse books and view cart
    if (guestPages.includes(currentPage)) {
        return; // Allow guest access
    }
    
    // Protected pages require login
    if (protectedPages.includes(currentPage) && !isLoggedIn()) {
        if (confirm('Please login to access this page. Would you like to login now?')) {
            window.location.href = 'login.html';
        } else {
            window.location.href = 'index.html';
        }
        return;
    }
}

function updateUserMenu() {
    const user = getCurrentUser();
    const nav = document.querySelector('.nav');
    
    if (!nav) return;
    
    // Remove existing user menu if any
    const existingMenu = document.querySelector('.user-menu');
    if (existingMenu) existingMenu.remove();
    
    if (user) {
        // Add user menu
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <button class="user-menu-btn" onclick="toggleUserMenu()">
                👤 ${user.name}
                ${isAdmin() ? ' (Admin)' : ''}
            </button>
            <div class="user-dropdown" id="user-dropdown">
                <a href="account.html" class="user-dropdown-item">My Account</a>
                <a href="orders.html" class="user-dropdown-item">My Orders</a>
                ${isAdmin() ? '<a href="admin.html" class="user-dropdown-item">Admin Panel</a>' : ''}
                <a href="#" class="user-dropdown-item logout" onclick="logout(); return false;">Logout</a>
            </div>
        `;
        
        // Insert before the last nav item or at the end
        nav.appendChild(userMenu);
    } else {
        // Add login link
        const loginLink = document.createElement('a');
        loginLink.href = 'login.html';
        loginLink.className = 'nav-link';
        loginLink.textContent = 'Login';
        nav.appendChild(loginLink);
    }
}

function toggleUserMenu() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.getElementById('user-dropdown');
    
    if (userMenu && dropdown && !userMenu.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// Make functions globally available
window.viewBookDetails = viewBookDetails;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.saveAccountInfoForm = saveAccountInfoForm;
window.saveAddressInfo = saveAddressInfo;
window.login = login;
window.register = register;
window.logout = logout;
window.toggleUserMenu = toggleUserMenu;
window.isLoggedIn = isLoggedIn;
window.isAdmin = isAdmin;
window.loadBooks = loadBooks;
window.togglePointsUsage = togglePointsUsage;
window.redeemCode = redeemCode;
window.proceedToCheckout = proceedToCheckout;


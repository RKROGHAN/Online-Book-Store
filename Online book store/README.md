# Online Bookstore

A fully functional online bookstore built with HTML, CSS, and JavaScript. All data is stored locally using the browser's localStorage, making it completely portable and requiring no database or server setup.

## Features

### 🛍️ Shopping Features
- **Book Catalog**: Browse through a wide selection of books
- **Book Details**: View detailed information about each book including:
  - Title, Author, Description
  - Price, Rating, Reviews
  - ISBN, Pages, Publication Year
  - Stock Availability
- **Search & Filter**: 
  - Search by title, author, or ISBN
  - Filter by category
  - Sort by price, rating, or title
- **Shopping Cart**: 
  - Add/remove books
  - Update quantities
  - View cart totals
- **Checkout Process**:
  - Shipping information form
  - Payment information form
  - Order summary with totals
- **Order Management**:
  - Order history
  - Order status tracking
  - Order details

### 👤 User Features
- **Account Management**: Save personal information and shipping address
- **Order History**: View all past orders with details
- **Recently Viewed**: Track recently viewed books (stored locally)

### 💾 Data Storage
- All data is stored in browser's localStorage
- Books catalog stored in JSON file
- Cart, orders, and account info persist across sessions
- Completely portable - works on any system without installation

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or database required!

### Installation
1. Download or clone this project
2. Open `index.html` in your web browser
3. That's it! The bookstore is ready to use.

### File Structure
```
Online Bookstore/
│
├── index.html              # Main page with book catalog
├── book-details.html       # Individual book details page
├── cart.html               # Shopping cart page
├── checkout.html           # Checkout page
├── orders.html             # Order history page
├── account.html            # User account page
├── order-confirmation.html # Order confirmation page
├── books.json              # Books catalog data
├── styles.css              # All styling
├── script.js               # All functionality
└── README.md               # This file
```

## How to Use

### Browsing Books
1. Open `index.html` in your browser
2. Browse the book catalog on the home page
3. Use the search bar to find specific books
4. Use category filter to browse by genre
5. Use sort options to organize books

### Viewing Book Details
- Click on any book card to view detailed information
- See full description, ratings, and stock availability
- Add books directly to cart from the details page

### Shopping Cart
1. Click "Add to Cart" on any book
2. View cart by clicking "Cart" in the navigation
3. Adjust quantities or remove items
4. Click "Proceed to Checkout" when ready

### Checkout
1. Fill in shipping information
2. Enter payment details
3. Review order summary
4. Click "Place Order" to complete purchase

### Viewing Orders
- Click "Orders" in navigation to see order history
- View order details, status, and items

### Account Management
- Click "Account" in navigation
- Update personal information
- Save shipping address for faster checkout

## Data Persistence

All data is stored in the browser's localStorage:
- **Cart**: Persists across sessions
- **Orders**: Saved order history
- **Account Info**: Saved personal and address information
- **Books Stock**: Updated when orders are placed

### Important Notes
- Data is stored locally in your browser
- Clearing browser data will remove saved information
- Data is specific to each browser and device
- To transfer data, you can export/import localStorage (advanced)

## Customization

### Adding More Books
Edit `books.json` and add new book objects with the following structure:
```json
{
  "id": 13,
  "title": "Book Title",
  "author": "Author Name",
  "price": 12.99,
  "category": "Category",
  "description": "Book description",
  "image": "image-url",
  "rating": 4.5,
  "reviews": 1000,
  "stock": 50,
  "isbn": "978-0-123456-78-9",
  "pages": 300,
  "year": 2024
}
```

### Styling
All styles are in `styles.css`. You can customize:
- Colors (search for color codes like `#667eea`)
- Fonts
- Layouts
- Responsive breakpoints

## Browser Compatibility

Works on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Troubleshooting

### Books not loading
- Make sure `books.json` is in the same folder as `index.html`
- Check browser console for errors
- Ensure you're opening the HTML file directly or using a local server

### Cart/Orders not saving
- Check if localStorage is enabled in your browser
- Try clearing browser cache and reloading
- Check browser console for errors

### Images not displaying
- Placeholder images are used by default
- Replace image URLs in `books.json` with actual book cover images
- Ensure image URLs are accessible

## Features Overview

✅ Book catalog with search and filtering
✅ Book details page with full information
✅ Shopping cart with quantity management
✅ Checkout process with forms
✅ Order placement and confirmation
✅ Order history tracking
✅ Account management
✅ Stock management
✅ Responsive design for mobile and desktop
✅ No external dependencies
✅ Fully portable - works anywhere

## Support

For issues or questions:
- Check the browser console for error messages
- Ensure all files are in the same directory
- Verify localStorage is enabled in your browser

## License

This project is open source and available for personal and commercial use.

---

**Enjoy your online bookstore! 📚**


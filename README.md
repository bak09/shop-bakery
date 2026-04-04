# Shop Bakery - React E-commerce Application

A modern, full-featured bakery e-commerce application built with React, featuring admin panel, product management, and beautiful UI.

## Features

### 🛒 Public Features
- **Product Catalog**: Browse bakery products with beautiful images
- **Product Details**: Detailed view of each product
- **Shopping Cart**: Add/remove items, calculate totals
- **Responsive Design**: Works on all devices
- **Image Gallery**: High-quality product photos

### 🔐 Admin Panel
- **Authentication**: Secure login system
- **Product Management**: Add, edit, delete products
- **Image Upload**: Upload custom product images from local device
- **Dashboard**: Admin overview and navigation
- **Order Management**: Future orders tracking

### 🛠️ Technical Features
- **React Router**: Client-side routing with protected routes
- **Context API**: State management for auth and data
- **Local Storage**: Persistent data storage
- **File Upload**: Image handling with base64 conversion
- **Responsive CSS**: Modern, clean design

## Screenshots

### Home Page
![Home Page](screenshots/home.png)
*Main landing page with featured products*

### Product Catalog
![Product Catalog](screenshots/catalog.png)
*Grid view of all available bakery products*

### Product Details
![Product Details](screenshots/product-details.png)
*Detailed product view with add to cart functionality*

### Admin Login
![Admin Login](screenshots/admin-login.png)
*Secure admin authentication page*

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)
*Admin control panel overview*

### Product Management
![Product Management](screenshots/admin-products.png)
*Add, edit, and manage bakery products*

## Installation

1. Clone the repository:
```bash
git clone https://github.com/bak09/shop-bakery.git
cd shop-bakery
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Admin Access

- **URL**: `/admin/login`
- **Email**: `admin@bakery.com`
- **Password**: `admin123`

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context for state management
├── data/               # Mock data and constants
├── layouts/            # Layout components for public/admin
├── pages/              # Page components
│   ├── public/         # Public user pages
│   └── admin/          # Admin-only pages
├── routes/             # Route protection logic
└── styles.css          # Global styles
```

## Technologies Used

- **React** - Frontend framework
- **React Router** - Client-side routing
- **Context API** - State management
- **Local Storage** - Data persistence
- **CSS** - Styling
- **Unsplash API** - Auto-generated images

## Features in Detail

### Product Management
- Add products with custom images or auto-generated ones
- Edit product details (name, price, category, description)
- Delete products from catalog
- Images stored as base64 for offline functionality

### Shopping Experience
- Browse products in responsive grid
- View detailed product information
- Add items to cart with quantity control
- Persistent cart across sessions

### Admin Security
- Protected routes requiring authentication
- Automatic redirect to login for unauthorized access
- Secure logout functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add screenshots of new features
5. Commit and push
6. Create a pull request

## License

This project is licensed under the MIT License.

---

Built with ❤️ for bakery lovers everywhere!


# Meem - E-Commerce Platform

A modern, full-stack e-commerce application built with React, featuring a comprehensive shopping experience with admin management capabilities.

## 🚀 Overview

Meem is a feature-rich e-commerce platform that provides users with an intuitive shopping experience while offering administrators powerful tools to manage products, users, and orders. The application includes user authentication, product browsing, cart management, reviews, payment processing, and a responsive design with dark/light theme support.

## ✨ Key Features

### 🛒 Shopping Features

- **Product Browsing**: Browse products by categories and subcategories
- **Product Details**: Detailed product pages with images, descriptions, and reviews
- **Search Functionality**: Search products across the platform
- **Shopping Cart**: Add, remove, and manage cart items with persistent storage
- **Product Reviews**: View and submit product reviews
- **Responsive Design**: Optimized for desktop and mobile devices

### 👤 User Management

- **User Authentication**: Login, registration, and password recovery
- **User Profiles**: Manage personal information and order history
- **Role-based Access**: Separate interfaces for customers and administrators

### 🛠️ Admin Panel

- **Product Management**: Add, edit, and delete products
- **User Management**: View and manage user accounts
- **Order Management**: Track and manage customer orders
- **Dashboard**: Overview of platform statistics and recent activity

### 💳 Payment & Checkout

- **Stripe Integration**: Secure payment processing
- **Order Tracking**: Real-time order status updates
- **Payment Success/Cancel Handling**: Comprehensive checkout flow

### 🎨 User Experience

- **Theme Switching**: Light and dark mode support
- **Smooth Animations**: Framer Motion powered transitions
- **Toast Notifications**: Real-time feedback for user actions
- **Image Management**: Cloudinary integration for product images

## 🛠️ Technology Stack

### Frontend

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Material-UI (MUI)** - Component library with theming
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client for API calls
- **React Query** - Data fetching and caching
- **JWT Decode** - Token handling for authentication

### Payment & Media

- **Stripe** - Payment processing
- **Cloudinary** - Image hosting and management

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Type definitions
- **PostCSS** - CSS processing

## 📁 Project Structure

```
src/
├── api/                    # API service functions
│   ├── categoriesApi.js
│   ├── ordersApi.js
│   ├── productsApi.js
│   ├── reviewsApi.js
│   └── usersApi.js
├── components/             # Shared components
├── context/                # React contexts for state management
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── SearchContext.jsx
│   └── ThemeContext.jsx
├── features/               # Feature-based modules
│   ├── admin/              # Admin panel
│   │   ├── components/
│   │   ├── pages/
│   │   ├── product/
│   │   ├── routes/
│   │   └── user/
│   ├── auth/               # Authentication
│   ├── checkout/           # Payment processing
│   ├── info/               # Information pages
│   └── Shop/               # Shopping features
├── routes/                 # Route configurations
└── utils/                  # Utility functions
```

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Backend API** running on `http://localhost:5000`

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_CLOUDINARY_URL=your_cloudinary_url
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 🚀 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd react-ecommerce-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🔗 API Endpoints

The frontend communicates with a backend API running on `http://localhost:5000`. The following endpoints are used:

### Products API

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/:slug` - Get product by slug
- `POST /api/products` - Add new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Users API

- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Register new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin)
- `POST /api/users/forgetpass` - Password recovery

### Orders API

- `GET /api/orders` - Get all orders (Admin)
- `POST /api/orders` - Create new order

### Categories API

- `GET /api/categories` - Get all categories

### Reviews API

- `GET /api/reviews/:productId` - Get reviews for product
- `POST /api/reviews` - Add new review

## 📖 Usage Guide

### For Customers

1. **Browse Products**: Visit the homepage to see featured products and categories
2. **Search**: Use the search bar to find specific products
3. **Add to Cart**: Click "Add to Cart" on product pages
4. **Checkout**: Review cart and proceed to payment with Stripe
5. **Leave Reviews**: After purchasing, leave reviews on product pages

### For Administrators

1. **Access Admin Panel**: Navigate to `/admin` (requires admin role)
2. **Manage Products**: Add, edit, or remove products
3. **Manage Users**: View and manage user accounts
4. **Track Orders**: Monitor order status and history

### Authentication

- **Register**: Create a new account at `/auth/register`
- **Login**: Sign in at `/auth/login`
- **Forgot Password**: Reset password at `/auth/forgot`

## 🎨 Customization

### Theme Configuration

The app supports light and dark themes. Theme preferences are saved in localStorage.

### Styling

- **Tailwind CSS**: Utility classes for rapid styling
- **Material-UI**: Pre-built components with custom theming
- **Custom CSS**: Additional styles in `src/index.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code structure and naming conventions
- Use ESLint for code quality
- Write meaningful commit messages
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React & Vite**

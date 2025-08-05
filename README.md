# E-Commerce Frontend Application

E-commerce application built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

### Core Features

- **Product Listing**: Browse a catalog of products with images, names, and prices
- **Product Details**: View detailed product information in a modal
- **Shopping Cart**: Add products to cart, adjust quantities, and remove items
- **Checkout Process**: Complete orders with customer information collection

### Additional Features

- **Search & Filter**: Search products by name and filter by category
- **Local Storage**: Cart persistence across browser sessions
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: Graceful error handling with user feedback
- **Toast Notifications**: User feedback for actions

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: React Context API
- **Testing**: Jest + React Testing Library
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:

```bash
   git clone <repository-url> e-store
   cd e-store
```

2. Install dependencies:

```bash
   npm install
```

3. Run the development server:

```bash
   npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available API Endpoints:

- `GET /api/v1/products`: Fetch products with optional filtering
- `GET /api/v1/products/:id`: Fetch single product by ID

## State Management

The application uses React Context API for cart state management:

- **CartProvider**: Provides cart state and actions to the entire app
- **useCart**: Custom hook for accessing cart functionality
- **Local Storage**: Cart persistence

## Testing

The application includes some basic tests using Jest and React Testing Library.

### Running Tests:

```bash
npm run test
```

## Assumptions made

- The user journey is as follows:

  1. User browses products
  2. User adds products to cart
  3. User proceeds to checkout
  4. User enters shipping information
  5. User completes order

- Nextjs API routes are the same as the backend API routes by expressjs, fastify, etc

## Future Enhancements

- Debounce search input to avoid making too many requests
- Real-time form input validation
- User authentication and accounts
- Real payment processing integration via stripe
- Product reviews and ratings
- Wishlist functionality
- Order history and tracking
- Admin dashboard for product management
- Advanced filtering and sorting options (by ratings, review count, price range)
- More robust error handling and logging
- Dedicated store for app state
- More comprehensive testing
- Many more...

# E-Store, a Simple E-Commerce App

App built with Next.js 15, TypeScript, and Tailwind CSS.

Live Demo Available at [https://e-store-five-zeta.vercel.app](https://e-store-five-zeta.vercel.app)

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
- **Querying**: Axios + TanStack Query
- **Icons**: Lucide React

## Screenshots

![Screenshot 2025-08-06 at 00 33 23](https://github.com/user-attachments/assets/6c505552-7ffd-4964-893a-cdd62171940e)
![Screenshot 2025-08-06 at 00 33 37](https://github.com/user-attachments/assets/703d5219-836f-4e75-bd37-ef05778bbe67)
![Screenshot 2025-08-06 at 00 33 52](https://github.com/user-attachments/assets/9a087d1f-585b-498e-987e-53107623aa75)
![Screenshot 2025-08-06 at 00 34 56](https://github.com/user-attachments/assets/ca66fe67-4700-45eb-a387-6af7dd7db22c)


## Getting Started

### Prerequisites

- Node.js ^18.14.0 || ^20.0.0 || ^22.0.0 || >=24.0.0
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
- Database integration
- User authentication and accounts
- Payment processing integration via stripe
- Product reviews and ratings
- Wishlist functionality
- Order history and tracking
- Admin dashboard for product management
- Advanced filtering and sorting options (by ratings, review count, price range)
- More robust error handling and logging
- Dedicated store for app state
- More comprehensive testing
- Many more...

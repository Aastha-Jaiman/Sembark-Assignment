# 🛍️ Sembark Store
Sembark Store is a responsive e-commerce web application built using React, TypeScript, Vite, Tailwind CSS, featuring product listing, search, sorting, category filters, cart management, and a clean accessible UI.  
This project uses the **FakeStore API** for product data and includes **Cypress** setup for end-to-end testing.


📦 **GitHub Repository:** 🔗 https://github.com/Aastha-Jaiman/Sembark-Assignment

🚀 **Live Demo:** 🔗 https://sembark-store.vercel.app/


## 🚀 Features

### 🛒 Shopping
- Add, remove, update item quantity in cart
- Cart data is persisted using LocalStorage

### 🔍 Product Search & Filters
- Search products using URL search parameters
- Filter products by categories
- Sort products by price (Low → High, High → Low)
- Mobile-friendly filter accordion system

### 📱 Responsive & Accessible
- Fully responsive layout for mobile, tablet, and desktop
- Uses semantic HTML and ARIA labels for improved accessibility

### 🧪 Cypress Test Support
- Includes Cypress project setup for UI and E2E testing
- Tests can run in UI mode or headless mode


## 🛠 Tech Stack
React, TypeScript, TailwindCSS, React Router, FakeStore API , Cypress (E2E Testing)


## 📂 Project Structure
Sembark-Assignment/
├── src/                            # Main application source code
│   ├── components/                 # Reusable UI components
│   │   ├── FilterBar.tsx           # Sidebar category + sort filters
│   │   ├── Footer.tsx              # Global footer showing cart summary
│   │   ├── Navbar.tsx              # Top navigation bar + cart badge
│   │   └── ProductCard.tsx         # Single product UI card
│   │
│   ├── context/
│   │   └── CartContext.tsx         # Global cart state using React Context + LocalStorage
│   │
│   ├── pages/                      # Main screens / route pages
│   │   ├── Cart.tsx                # Cart page (update, remove, total summary)
│   │   ├── Home.tsx                # Product listing grid + search & filters
│   │   └── ProductDetail.tsx       # Single product detail page + add-to-cart
│   │
│   ├── App.tsx                     # Application root + routes config
│   ├── main.tsx                    # Entry file for rendering React
│   ├── index.css                   # Tailwind base styles
│
├── cypress/                        # Cypress E2E test suite
│   ├── e2e/
│   │   └── home.cy.ts              # Example Cypress test (if added)
│   └── support/                    # Cypress support utilities
│
├── .gitignore                      # Ignored files (node_modules, dist, etc.)
├── package.json                    # Project dependencies & scripts
├── tailwind.config.js              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
└── vite.config.ts                  # Vite bundler config


## 🧩 Setup & Installation

Step-1 Clone the repository
- git clone https://github.com/Aastha-Jaiman/Sembark-Assignment.git
- cd Sembark-Assignment

Step-2 Install dependencies
- npm install

Step-3 Start development server
- npm run dev

## App runs at:
👉 http://localhost:5173/


## 🧪 Running Cypress Tests (Optional)

Step-1 Open Cypress Test Runner
- npx cypress open

Step-2 Running Cypress Tests
📌 Important: Run Cypress in a second terminal
- To execute Cypress tests properly, you need two running terminals:

        Terminal 1: Start the app
        - npm run dev

        Terminal 2: Open Cypress
        - npx cypress open

Step-3 After Cypress opens:

1. Choose E2E Testing
2. Select your browser (Chrome, Edge, etc.)
3. Click Start E2E Testing
4. Run any test listed inside the /cypress/e2e folder


### Run Cypress in headless mode (optional)
npx cypress run


🌐 API Used

### FakeStore Products API:
🔗 https://fakestoreapi.com/products

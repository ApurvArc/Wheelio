# Wheelio - Car Rental Application 🚗

Wheelio is a modern, full-stack car rental platform built with the **MERN** stack. It offers a seamless experience for users to browse, book, and manage vehicle rentals, while providing car owners/admins with a dashboard to manage users, bookings, and vehicle inventory.

## ✨ Key Features

### 👤 User Features
- **Authentication**: 
  - standard Email/Password Login & Signup.
  - **Google OAuth**: Secure "Sign in with Google" using Authorization Code Flow.
  - **Profile Setup**: Smart name prompt for first-time Google users.
- **Vehicle Browsing**: Filter and search available cars by location, price, and type.
- **Booking System**: Select pickup/return dates and book vehicles instantly.
- **User Dashboard**: Manage "My Bookings" and view status.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.
- **Dark Mode**: Built-in toggle for Light/Dark themes.

### 🛡️ Admin/Owner Features
- **Dashboard**: Overview of business stats.
- **Inventory Management**: Add, edit, and manage vehicles (with image uploads via ImageKit).
- **Booking Management**: View and update booking statuses.

---

## 🛠️ Tech Stack

### Client (Frontend)
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM (v7)
- **State/API**: Axios, Context API
- **UI Components**: Lucide React (Icons), React Hot Toast (Notifications), Framer Motion (Animations)
- **Maps**: Geoapify (Geocoder Autocomplete)

### Server (Backend)
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB & Mongoose
- **Auth**: JWT (JSON Web Tokens), Google OAuth (Code Flow), Bcryptjs
- **Services**: 
  - **ImageKit**: Cloud image storage.
  - **Resend**: Email services.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- Google Cloud Console Project (for OAuth)
- ImageKit Account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/wheelio.git
   cd wheelio
   ```

2. **Setup Backend:**
   ```bash
   cd server
   npm install
   ```
   
   Create a `.env` file in `server/`:
   ```env
   # Database & App
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   
   # Google OAuth (Required)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # ImageKit (For Image Uploads)
   IMAGEKIT_PUBLIC_KEY=your_public_key
   IMAGEKIT_PRIVATE_KEY=your_private_key
   IMAGEKIT_URL_ENDPOINT=your_url_endpoint

   # Optional (Email)
   RESEND_API_KEY=your_resend_api_key
   ```

   Start the server:
   ```bash
   npm run server
   ```

3. **Setup Frontend:**
   ```bash
   cd ../client
   npm install
   ```
   
   Create a `.env` file in `client/`:
   ```env
   VITE_BASE_URL=http://localhost:3000
   VITE_CURRENCY=₹
   
   # Google OAuth (Same Client ID as backend)
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   
   # Maps
   VITE_GEO_API_KEY=your_geoapify_key
   ```

   Start the client:
   ```bash
   npm run dev
   ```

### 🔐 Google OAuth Configuration
To enable "Sign in with Google":
1. Go to **Google Cloud Console** > **APIs & Services** > **Credentials**.
2. Create an **OAuth 2.0 Client ID**.
3. Set **Authorized JavaScript origins** to `http://localhost:5173`.
4. Set **Authorized redirect URIs** to `http://localhost:5173` (and `postmessage` if needed).
5. Copy the **Client ID** and **Client Secret** to your `.env` files.

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts frontend (Vite) server |
| `npm run server` | Starts backend server (Nodemon) |
| `npm run build` | Builds frontend for production |

---

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request.
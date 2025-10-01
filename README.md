# Wheelio - Car Rental Application

Wheelio is a modern, full-stack car rental application designed to provide a seamless and efficient car booking experience. This project features a user-friendly interface for browsing, selecting, and renting vehicles, along with a robust backend for managing inventory, bookings, and user data.

## Tech Stack

### Client
- **Framework**: React
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Build Tool**: Vite

### Server
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Image Storage**: ImageKit
- **Middleware**: CORS

## Features
- User authentication (signup, login)
- Browse and filter available cars
- View detailed information for each car
- Book a car for a specified period
- View and manage personal bookings
- Admin panel for managing car inventory

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB account and connection string

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/wheelio.git
   cd wheelio
   ```

2. **Install client dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies:**
   ```bash
   cd ../server
   npm install
   ```

### Environment Variables

Create a `.env` file in the `server` directory and add the following variables:

```
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
IMAGEKIT_PUBLIC_KEY=<your_imagekit_public_key>
IMAGEKIT_PRIVATE_KEY=<your_imagekit_private_key>
IMAGEKIT_URL_ENDPOINT=<your_imagekit_url_endpoint>
```

## Available Scripts

### Client
- `npm run dev`: Starts the client-side development server.
- `npm run build`: Builds the client-side application for production.
- `npm run lint`: Lints the client-side code.
- `npm run preview`: Previews the production build.

### Server
- `npm start`: Starts the server.
- `npm run server`: Starts the server with nodemon for development.
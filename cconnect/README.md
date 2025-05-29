# CCONNECT - E-commerce Platform

A full-stack e-commerce platform built with React, Node.js, and MongoDB.

## Features

- User Authentication (Login/Register)
- Product Browsing and Search
- Shopping Cart Management
- Order Processing
- Real-time Notifications
- Admin Dashboard
- Responsive Design

## Tech Stack

- Frontend: React, Tailwind CSS, Socket.IO Client
- Backend: Node.js, Express, MongoDB
- Real-time: Socket.IO
- Authentication: JWT

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd cconnect
```

2. Install dependencies:
```bash
# Install backend dependencies
cd src/backend
npm install

# Install frontend dependencies
cd ../..
npm install
```

3. Environment Setup:

Create `.env` file in `src/backend`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/cconnect
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

Create `.env` file in `src`:
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

4. Start the servers:

```bash
# Start backend server
cd src/backend
npm run dev

# Start frontend server (in a new terminal)
cd ../..
npm run dev
```

5. Access the application:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
cconnect/
├── src/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── server.js
│   │   └── uploads/
│   └── components/
│   ├── contexts/
│   ├── pages/
│   └── App.jsx
```

## Features in Detail

### User Features
- User registration and login
- Profile management
- Product browsing with search and filters
- Shopping cart management
- Order placement and tracking
- Real-time notifications

### Admin Features
- Product management (CRUD)
- Order management
- User management
- Dashboard with analytics

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

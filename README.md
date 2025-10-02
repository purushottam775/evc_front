# 🚗⚡ EV Charging Station Management System - Frontend

Professional, production-ready React frontend for the EV Charging Station Management and Booking System. Built with modern technologies and optimized for deployment.

## 🚀 Quick Start

### For Deployment
```bash
# 1. Copy environment template
cp env.example .env

# 2. Update .env with your production values
# 3. Run deployment script
./deploy.sh    # Linux/Mac
deploy.bat     # Windows

# 4. Deploy the dist/ folder to your hosting service
```

### For Development
```bash
npm install
npm run dev
```

## Features

### User Features
- 🔍 **Search Stations**: Find charging stations by location and charging type
- 📅 **Book Slots**: Book charging slots with date and time selection
- 📊 **Dashboard**: View booking statistics and history
- ✅ **Booking Management**: View all bookings (pending, approved, rejected, cancelled)
- 👤 **Profile Management**: Update personal information and change password
- 🔐 **Forgot Password**: Reset password with OTP verification

### Admin Features
- 📋 **Manage Bookings**: Approve or reject pending booking requests
- 🏢 **Manage Stations**: Create, update, and delete charging stations
- 🔌 **Manage Slots**: Create, update, and delete charging slots
- 👥 **Manage Users**: Block, unblock, and delete users
- 📊 **Dashboard Statistics**: View overview of stations, users, and bookings

## Tech Stack

- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Context API** - State management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

## Installation

1. Navigate to the frontend directory:
```bash
cd ev/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```bash
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── admin/      # Admin-specific components
│   │   ├── user/       # User-specific components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Footer.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/        # Context providers
│   │   └── AuthContext.jsx
│   ├── pages/          # Page components
│   │   ├── admin/
│   │   │   └── AdminDashboard.jsx
│   │   ├── user/
│   │   │   └── UserDashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ForgotPassword.jsx
│   ├── utils/          # Utility functions
│   │   └── api.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
└── package.json
```

## Environment Variables

Create a `.env` file with the following variables:

```
VITE_API_URL=http://localhost:5000/api
```

## API Integration

The frontend connects to the backend API using Axios. All API calls are made through the `api.js` utility which handles:
- Base URL configuration
- JWT token attachment
- Error handling
- Automatic redirect on 401 (Unauthorized)

## User Roles

### User
- Can search and view charging stations
- Can book charging slots
- Can view and manage their bookings
- Can update their profile

### Admin (Super Admin / Station Manager)
- Can manage all bookings (approve/reject)
- Can create, update, and delete stations
- Can manage charging slots
- Can manage users (block/unblock/delete)
- Can view system statistics

## Features Walkthrough

### For Users

1. **Registration & Login**
   - Register with name, email, password, phone, vehicle details
   - Login with email and password
   - Forgot password with OTP reset

2. **Search & Book Stations**
   - Search stations by location and charging type
   - View available slots at each station
   - Book a slot by selecting date and time
   - Booking requests are sent to admin for approval

3. **My Bookings**
   - View all bookings with status filters
   - See pending, approved, rejected, and cancelled bookings
   - Cancel pending bookings

4. **Profile Management**
   - Update personal information
   - Change password
   - View vehicle details

### For Admins

1. **Manage Bookings**
   - View all pending booking requests
   - Approve or reject bookings
   - Auto-update available slots

2. **Manage Stations**
   - Create new charging stations
   - Update station details
   - Delete stations
   - Set station status (active/inactive)
   - Configure charging type (fast/slow)

3. **Manage Slots**
   - View all slots across stations
   - Add new slots to stations
   - Update slot status
   - Delete slots

4. **Manage Users**
   - View all registered users
   - Search users by name or email
   - Block/unblock users
   - Delete users

## Design Features

- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **Modern UI**: Clean and intuitive interface
- **Smooth Animations**: Transitions and hover effects
- **Loading States**: Spinners and loading indicators
- **Error Handling**: User-friendly error messages
- **Form Validation**: Client-side validation
- **Protected Routes**: Role-based access control

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port already in use
If port 5173 is already in use, Vite will automatically try the next available port.

### API Connection Issues
Make sure the backend server is running on `http://localhost:5000` and CORS is enabled.

### Tailwind styles not working
Run `npm install` to ensure all dependencies are installed, especially `tailwindcss`, `postcss`, and `autoprefixer`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please open an issue in the repository.

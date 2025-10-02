import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";   // MongoDB connection
import passport from "passport";
import session from "express-session";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import stationRoutes from "./routes/stationRoutes.js"; 
import slotRoutes from "./routes/slotRoutes.js"; 
import bookingUserRoutes from "./routes/bookingUserRoutes.js";
import bookingAdminRoutes from "./routes/bookingAdminRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",              // Local dev frontend
  "https://your-frontend.onrender.com"  // Replace with your deployed frontend
];

// CORS Middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Allow non-browser requests like Postman
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}));

// Body parser
app.use(express.json());

// Initialize passport
app.use(passport.initialize());

// Optional: session for passport (if needed for OAuth)
app.use(session({
  secret: process.env.JWT_SECRET || "supersecretkey",
  resave: false,
  saveUninitialized: false
}));

// Root route
app.get("/", (req, res) => {
  res.send("EV Slot Management Backend is running with MongoDB!");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/admins/users", adminUserRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings/user", bookingUserRoutes);   
app.use("/api/bookings/admin", bookingAdminRoutes); 

// 404 handler for unknown endpoints
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Global error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

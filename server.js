require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/auth');
const User = require('./models/User');
require('./config/passport'); // Ensure Passport configuration is loaded

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Enable CORS for frontend

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

connectDB();

// Add session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "my_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }, // 1-day expiration
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Express.js Server Running!</h1>');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
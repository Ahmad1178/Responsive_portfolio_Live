// server/server.js
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Instead of bodyParser.json() if using latest Express

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => console.log("MongoDB connected"));

// Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: String,
});
const Contact = mongoose.model("Contact", contactSchema);

const reviewSchema = new mongoose.Schema(
  {
    name: String,
    comment: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

// Route to save contact
app.post("/api/contact", async (req, res) => {
  console.log("Received:", req.body); // <-- Add this
  const { name, email, message } = req.body;
  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log("Saved to DB:", newContact); // <-- Add this
    res.status(201).send("Message saved");
  } catch (err) {
    console.error("DB Save Error:", err); // <-- Add this
    res.status(500).send("Error saving message");
  }
});

// Routes
// app.get("/api/reviews", async (req, res) => {
//   try {
//     const reviews = await Review.find().sort({ _id: -1 });
//     res.json(reviews);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch reviews" });
//   }
// });

// POST /api/reviews
// app.post("/api/reviews", async (req, res) => {
//   const { name, comment } = req.body;
//   try {
//     const review = new Review({ name, comment });
//     await review.save();
//     res.status(201).json(review);
//     console.log(object);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to save review" });
//     console.log(error);
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

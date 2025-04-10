const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const doctorRoutes = require("./routes/doctors");
const openaiRoutes = require("./routes/openai");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);  
app.use("/api/doctors", doctorRoutes);
app.use("/api/openai", openaiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

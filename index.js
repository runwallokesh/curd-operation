const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// 🔐 Middleware
const protect = require("./middleware/protect");
const authorizeRoles = require("./middleware/authorize");

// 🛣️ Auth & Role Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/admin-only", protect, authorizeRoles("admin"), (req, res) => {
  res.send("Only Admin can access this.");
});

app.get("/editor-panel", protect, authorizeRoles("admin", "editor"), (req, res) => {
  res.send("Editor & Admin allowed.");
});

app.get("/api/profile", protect, (req, res) => {
  res.json({ message: "Welcome", user: req.user });
});

// 🆕 ✅ Add this line to connect PBAC task routes
app.use("/api", require("./routes/task.routes"));  // ⬅️ PBAC route

// 🔊 Server Start
app.listen(3000, () => console.log("Server on http://localhost:3000"));

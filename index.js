require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const recordRoutes = require("./src/routes/record.routes");
const dashboardRoutes = require("./src/routes/dashboard.routes");

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Finance API is running." });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
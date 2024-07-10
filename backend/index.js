const express = require('express');
const { errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const cors = require('cors');

connectDB();
const app = express();
const PORT = process.env.PORT || 3001;

// Corrected CORS configuration
app.use(cors({
  origin: "https://hotel-backend-xi.vercel.app",
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));

app.use(express.json());
app.use("/api/contacts", require("./routers/contacts"));
app.use("/api/users", require("./routers/users"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
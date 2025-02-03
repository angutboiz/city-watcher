const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

connectDB();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(require("./routes/index"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

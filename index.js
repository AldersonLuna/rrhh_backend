require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { errorHandler } = require("./middlewares/errorMiddleware");

const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;
const SERVER = process.env.SERVER;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.use("/api", routes);

app.use("/liveness", (req, res) => {
    res.sendStatus(200);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://${SERVER}:${PORT}`);
});


const express = require('express');

const mongoose = require('mongoose');

const router = require("./routes/routes")

const cors = require('cors'); // for enabling CORS

const app = express();

app.use(express.json());

require('dotenv').config();

// Enable CORS for all origins (not recommended for production)
app.use(cors());

// Or, to enable CORS for specific origins
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your frontend URL
}));


app.use("/api", router);
// Connect to MongoDB
mongoose.connect(process.env.URI)
    .then(() => {
        console.log("MongoDB is connected");
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });

const port = 8080;
app.listen(port, () => {
    console.log(`app is listening on ${port}`)
});
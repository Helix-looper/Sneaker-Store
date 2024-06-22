const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const authRoute = require("./routes/AuthRoute");
app.use("/api/auth", authRoute);

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=> console.log("connected to database!"))
    .catch(err => console.error("Error connecting:", err))

app.listen(5000, ()=> console.log("Server listeing on port 5000"));
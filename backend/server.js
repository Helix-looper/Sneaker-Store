const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
app.use(express.json())
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

app.listen(3000, ()=> console.log("Server listeing on port 3000"));
 require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8000

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: ["http://localhost:3000"]
}))

app.use("/api/tasks", taskRoutes);

//Routes
app.get("/", (req, res) => {
    res.send("Home page");
})

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running 0n port ${PORT}`);
        });
        
    } catch (error) {
        console.log(error);  
    }
};
startServer();
   


//app.use(cors());
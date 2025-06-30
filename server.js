const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");


//dot env configuration
dotenv.config();


//Db connection
connectDb()


//Rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
// URL => http//localhost:8080
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/restaurant', require('./routes/restaurantRoutes'));
app.use('/api/v1/category', require('./routes/categoryRoutes'));
app.use('/api/v1/food', require("./routes/foodRoutes"));


app.get("/", (req,res) =>{
    return res.status(200).send("<h1>welcome to the food server APP !<h1>");
});

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`.white.bgMagenta);
});

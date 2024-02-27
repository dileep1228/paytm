// mongodb+srv://dileepkumar1228:DSdkhT5YKOLfcOe9@cluster0.wtemzz7.mongodb.net/

const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors()); // CORS
app.use(express.json()); // body parser

const mainRouter = require("./routes/index");


app.use("/api/v1", mainRouter);


app.listen(3000, ()=>{
    console.log("in index.js");
});

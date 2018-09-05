import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";
const config = require("../dev-config");

const app = express();
const server = require('http').createServer(app);

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/chat");

app.use(express.static(path.resolve(__dirname, "../dev")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("*", (req, res ,next) => {
    if (req.path.match(/^\/api\//)) {
        next();
    } else {
        res.sendFile(path.resolve(__dirname, "../dev/index.html"));
    }
});

server.listen(process.env.PORT || config.port, () => {
    console.log(`Server running at:${config.port}` );
});
console.log("jhaha")

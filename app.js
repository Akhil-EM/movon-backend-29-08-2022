require("dotenv").config();
const express = require("express");
const cors = require("cors");
const moran = require("morgan");
const app = express();
const port = process.env.PORT;
const appName = require("./src/config/app.config").program;
const routes = require("./src/routes");
const fileUpload = require("express-fileupload");
const path = require("path");
const { appendFile } = require("fs");

// view engine setup
app.set('views', path.join(__dirname,"src",'views'));
app.set('view engine', 'ejs');

//configure node app
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(moran('tiny')); //logs time of request and response
app.use(express.static('public'));//share the public files
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true,
    limits: { fileSize: 1024 * 1024 * 5 },//5mb max file size
}));


routes.initializeBaseRoutes(app);



routes.initializeApplicationRoutes(app);


app.listen(port,()=>console.log(`\n${appName} is running on ${port}`));



const {writeLog} = require("./src/util/functions/write-log");
writeLog(__dirname,"dlkjkd")



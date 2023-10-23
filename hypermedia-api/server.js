const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('uploads'));

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage : storage});


app.post("/upload", upload.single("file"), async (req, res) => {
    const filePath = req.file.path;
    console.log(filePath);
    
})


const PORT = process.env.PORT || 1330;

app.listen (PORT, () => {
    console.log(`App is now running on port: ${PORT}`);
})
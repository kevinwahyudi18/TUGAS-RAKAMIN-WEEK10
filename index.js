const express = require("express");
const pool = require("./queries");
const bodyParser = require("body-parser");
const movies = require("./routes/movies.js");

const app = express();
const port = 3000;
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/movies", movies);
app.use("/upload", express.static(path.join(__dirname, "upload")));



// test error database
pool.connect((error, response) => {
    if (error) {
        console.error('Error connecting to the database:', error);
    } else {
        console.log('Connected to the database');
    }
});

app.listen(port, ()=>{
    console.log(`server run at port ${port}`);
});

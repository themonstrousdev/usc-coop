const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      mysql = require('mysql'),
      port = 3000,
      app = express(),
      getReq = require("./node/get"),
      postReq = require("./node/post"), 
      con = require("./node/connectDB");

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

app.use(getReq);
app.use(postReq);

// BOOT UP SERVER
app.listen(port, ()=>{
  console.log(`Server running on port ${port}`);
})

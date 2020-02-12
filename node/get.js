const express = require('express'),
      app = express.Router();

app.get("/", (req, res)=>{
  res.render("index");
})

module.exports = app;
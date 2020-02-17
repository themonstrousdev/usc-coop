const express = require('express'),
      app = express.Router();

app.get("/", (req, res)=>{
  res.render("index");
})

app.get("/tags", (req, res)=>{
  res.render("tags");
});

app.get("/news", (req, res)=>{
  res.render("news");
});

app.get("/faq", (req, res)=>{
  res.render("faq");
})

app.get("/download", (req, res)=>{
  res.render("download");
});

app.get("/contact-us", (req, res)=>{
  res.render("contact-us");
});

app.get("*", (req, res)=>{
  res.render("404");
})

module.exports = app;
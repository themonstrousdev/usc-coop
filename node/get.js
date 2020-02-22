const express = require('express'),
      app = express.Router();

app.get("/", async (req, res)=>{
  let q1 = `SELECT * FROM tags;`,
  filter = req.query.tag,
  con = await require("./connectDB");

  function posts(tags, id) {
    let q2 = `SELECT * FROM announcements;`;
    con.query(q2, async (err, rows)=>{
      if(err) {
        console.error(err.sqlMessage);
      } else {
        if(!id) {
          getAuthor(tags, rows);
        } else {
          let cards = await rows.filter(card => { let tagsArr = JSON.parse(card.tags); return tagsArr.includes(id)});
          if(cards.length == 0) {
            res.render("index", {tags: tags, filter: filter});
          } else {
            getAuthor(tags, cards);
          }
        }
      }
    })
  }

function getAuthor(tags, posts) {
    let q3 = `SELECT * FROM accounts`;
    con.query(q3, (err, rows)=>{
      if(err) {
        console.error(err.sqlMessage);
      } else {
          posts.forEach((item, ind, array) => {
            let arr = rows.filter(author => { return author.id == item.author});
            item.author = arr.length > 0 ? `${arr[0].firstName} ${arr[0].lastName}` : 'Anonymous';
            ind++;
            if(ind == array.length) {
              pages(tags, posts);
            }
          }); 
      }
    })
}

function pages(tags, posts) {
  let pages = [], page = req.query.num ? req.query.num : 1;
  while(posts.length > 9) {
    pages.push(posts.splice(0, 9));
  }

  if(posts.length <= 9) {
    pages.push(posts);
    posts = [];
    res.render("index", {tags: tags, filter: filter, pages: pages, posts: pages[page-1], page: page});
  }
}

  con.query(q1, (err, rows)=>{
    if(err) {
      console.error(err.sqlMessage);
    } else {
      let chosen = rows.filter(tag=>{ return tag.name == filter}),
          id = chosen.length > 0 ? chosen[0].id : null;
      posts(rows, id);
    }
  });
});

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

app.get("/login", (req, res)=>{
  res.render("login");
});

app.get("/readMore", (req, res)=>{
  res.render("readMore");
});

app.get("/register", async (req, res)=>{
  let con = await require("./connectDB"),
  query = "SELECT * from organizations";

  con.query(query, (err, rows) => {
    if(err) {
      console.error(err.sqlMessage);
    } else {
      res.render("register", {orgs: rows});
    }
  })
});

app.get("*", (req, res)=>{
  res.render("404");
})

module.exports = app;
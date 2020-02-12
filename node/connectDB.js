const sql = require('mysql'),
      mydb = "usc_coop";

let con = sql.createConnection({
        host: "localhost",
        user: "root",
        multipleStatements: true
      });

con.connect((err)=>{
  if(err) {
    throw err;
  } else {
    console.log("Connected to mySQL");
    let query = `select schema_name from information_schema.schemata where schema_name = '${mydb}';`;
    con.query(query, (err, res)=>{
      if(err) {
        throw err;
      } else {
        if(res.length == 0) {
          console.log("No db.");
          query = `CREATE DATABASE ${mydb}; 
                  USE ${mydb};
                  CREATE TABLE accounts(id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, firstName VARCHAR(20) NOT NULL, lastName VARCHAR(30) NOT NULL, username VARCHAR(12) NOT NULL, password VARCHAR(40) NOT NULL, org VARCHAR(50) NOT NULL, email VARCHAR(30) NOT NULL, type ENUM('member', 'admin') DEFAULT 'member', join_date DATETIME NOT NULL);
                  CREATE TABLE announcements(id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, title VARCHAR(30) NOT NULL, img VARCHAR(255) DEFAULT "images/logo/usc-logo.png", author INT NOT NULL, date_created DATETIME, tags JSON, content LONGTEXT NOT NULL, FOREIGN KEY (author) REFERENCES admins(id));
                  CREATE TABLE tags(id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL);
                  CREATE TABLE submissions(id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, fullName VARCHAR(60) NOT NULL, email VARCHAR(40) NOT NULL, phoneNum VARCHAR(30), services ENUM('general', 'yes', 'no', 'yeet') DEFAULT 'general', content LONGTEXT NOT NULL);`;
          con.query(query, (err, res)=> {
            if(err) {
              throw err;
            } else {
              console.log(`Created ${mydb} database`);
            }
          })
        } else {
          console.log("DB already exists.");
        }
        console.log("Connecting to db...");

        con = sql.createConnection({
          host: "localhost",
          user: "root",
          database: mydb,
          multipleStatements: true
        });
    
        con.connect((err)=>{
          if(err) {
            throw err;
          } else {
            console.log(`Connected to database: ${mydb}`);
          }
        })
      }
    });
  }
});

module.exports = con;
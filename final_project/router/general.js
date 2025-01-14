const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Register a new user
public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User has been successfully registered. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

  const get_books = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify({books}, null, 4)));
  });

  get_books.then(() => console.log("Promise for getting books in Task 10 resolved"));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  
  const isbn = req.params.isbn;

  const get_books_by_isbn = new Promise((resolve, reject) => {
    resolve(res.send(books[isbn]));
  });

  get_books_by_isbn.then(() => console.log("Promise for getting books by ISBN in Task 11 resolved"));
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  
  const get_books_author = new Promise((resolve, reject) => {
    let booksbyauthor = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        booksbyauthor.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
        resolve(res.send(JSON.stringify({booksbyauthor}, null, 4)));
      }

    });
    reject(res.send("No books by this author."))
        
    });

    get_books_author.then(function(){
            console.log("Promise for getting books by author in task 12 is resolved");
   }).catch(function () { 
                console.log('The mentioned author does not exist');
  });

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const get_books_by_title = new Promise((resolve, reject) => {

    let booksbytitle = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["title"] === req.params.title) {
        booksbytitle.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
        resolve(res.send(JSON.stringify({booksbytitle}, null, 4)));
      }
    });

    reject(res.send("No books with this title."))
    });

    get_books_by_title.then(function(){
        console.log("Promise for getting books by title in task 13 is resolved");
}).catch(function () { 
            console.log('The mentioned title does not exist');
});

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let booksbyreview = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["reviews"] === req.params.reviews) {
        booksbytitle.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
      }
    });
    res.send(JSON.stringify({booksbyreview}, null, 4));
});

module.exports.general = public_users;

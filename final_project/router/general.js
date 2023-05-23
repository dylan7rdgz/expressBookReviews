const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here

    const doesExist = (username)=>{
      let userswithsamename = users.filter((user)=>{
        return user.username === username
      });
      if(userswithsamename.length > 0){
        return true;
      } else {
        return false;
      }
    }

    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!doesExist(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  // res.body = JSON.stringify(books);
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here

  const ISBNno = req.params.isbn;
  console.log("ISBNno: ", ISBNno);
  if (0<ISBNno && ISBNno<11) {
    return res.status(200).json(books[ISBNno]);
  }
  console.log("no book with the requested isbn no.")
  return res.status(200).json({error: "no book with the requested isbn no."});

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here

  const authorName = req.params.author;
  console.log(authorName);
  const arr = []
  // console.log(books);
  const keys = Object.keys(books);
  console.log(keys);
  for (let i = 1; i <= keys.length; i++) {
    console.log(i, ": ", books[i].author);
    console.log("requested author: ", authorName);
    if (books[i].author === authorName)
      arr.push(books[i]);
  }
  return res.status(200).json(arr);

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  
  const titleName = req.params.title;
  console.log(titleName);
  const arr = []
  // console.log(books);
  const keys = Object.keys(books);
  console.log(keys);
  for (let i = 1; i <= keys.length; i++) {
    console.log(i, ": ", books[i].title);
    console.log("requested title: ", titleName);
    if (books[i].title === titleName)
      arr.push(books[i]);
  }
  return res.status(200).json(arr);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  
  const ISBNno = req.params.isbn;
  console.log("ISBNno: ", ISBNno);
  if (0<ISBNno && ISBNno<11) {
    return res.status(200).json(books[ISBNno].reviews);
  }
  console.log("no book with the requested isbn no.")
  return res.status(200).json({error: "no book with the requested isbn no."});
});

module.exports.general = public_users;

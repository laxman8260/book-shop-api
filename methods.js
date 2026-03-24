const axios = require('axios');

// Task 10 - Async/Await
async function getAllBooks() {
    const res = await axios.get('http://localhost:3000/books');
    console.log("All Books:", res.data);
}

// Task 11 - Promises
function getByISBN() {
    axios.get('http://localhost:3000/books/isbn/1')
        .then(res => console.log("By ISBN:", res.data))
        .catch(err => console.log(err));
}

// Task 12
async function getByAuthor() {
    const res = await axios.get('http://localhost:3000/books/author/Paulo%20Coelho');
    console.log("By Author:", res.data);
}

// Task 13
async function getByTitle() {
    const res = await axios.get('http://localhost:3000/books/title/The%20Alchemist');
    console.log("By Title:", res.data);
}

// Call all
// getAllBooks();
// getByISBN();
// getByAuthor();
getByTitle();
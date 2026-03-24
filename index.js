const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const books = require('./booksdb');

let users = [];
const SECRET = "secretkey";

// Task 1
app.get('/books', (req, res) => {
    res.json(books);
});

// Task 2
app.get('/books/isbn/:isbn', (req, res) => {
    res.json(books[req.params.isbn]);
});

// Task 3
app.get('/books/author/:author', (req, res) => {
    const result = Object.values(books).filter(
        book => book.author.toLowerCase() === req.params.author.toLowerCase()
    );
    res.json(result);
});

// Task 4
app.get('/books/title/:title', (req, res) => {
    const result = Object.values(books).filter(
        book => book.title.toLowerCase() === req.params.title.toLowerCase()
    );
    res.json(result);
});

// Task 5
app.get('/books/review/:isbn', (req, res) => {
    res.json(books[req.params.isbn].reviews);
});

// Task 6
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push({ username, password });
    res.json({ message: "User registered successfully" });
});

// Task 7
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(403).json({ message: "Invalid login" });
    }

    const token = jwt.sign({ username }, SECRET);
    res.json({ token });
});

app.listen(3000, () => {
    console.log("✅ Server running on port 3000");
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log("Users:", users);  // 👈 ADD THIS
    console.log("Login attempt:", username, password); // 👈 ADD

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(403).json({ message: "Invalid login" });
    }

    const token = jwt.sign({ username }, SECRET);
    res.json({ token });
});
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.sendStatus(403);

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
};

app.put('/books/review/:isbn', authenticate, (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;

    books[isbn].reviews[req.user.username] = review;

    res.json({ message: "Review added/updated" });
});
app.delete('/books/review/:isbn', authenticate, (req, res) => {
    const isbn = req.params.isbn;

    delete books[isbn].reviews[req.user.username];

    res.json({ message: "Review deleted" });
});
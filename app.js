const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blogdb'
});

let dbConnected = false;

connection.connect(error => {
    if (error) {
        console.error('Error connecting to the database:', error);
        dbConnected = false;
    } else {
        console.log('Connected to the database.');
        dbConnected = true;
    }
});

app.get('/', (req, res) => {
    if (!dbConnected) {
        res.send('Welcome to the Blog API! Database connection failed.');
    } else {
        res.send('Welcome to the Blog API! Ready to handle requests.');
    }
});

// POST /posts - Create a new blog post
app.post('/posts', (req, res) => {
    if (!dbConnected) {
        return res.status(503).send('Database is not connected.');
    }
    const postData = req.body;
    const sql = 'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)';
    connection.query(sql, [postData.title, postData.content, postData.author], (error, results) => {
        if (error) return res.status(500).send('Error creating new post.');
        res.status(201).send({ id: results.insertId, ...postData });
    });
});

// Retrieve a list of all blog posts
app.get('/posts', (req, res) => {
    if (!dbConnected) {
        return res.status(503).send('Database is not connected.');
    }
    const sql = 'SELECT * FROM posts';
    connection.query(sql, (error, results) => {
        if (error) return res.status(500).send('Error retrieving posts.');
        res.status(200).send(results);
    });
});

// Retrieve a specific blog post by ID
app.get('/posts/:id', (req, res) => {
    if (!dbConnected) {
        return res.status(503).send('Database is not connected.');
    }
    const sql = 'SELECT * FROM posts WHERE id = ?';
    connection.query(sql, [req.params.id], (error, result) => {
        if (error) return res.status(500).send('Error retrieving post.');
        res.status(200).send(result);
    });
});

// Update a specific blog post by ID
app.put('/posts/:id', (req, res) => {
    if (!dbConnected) {
        return res.status(503).send('Database is not connected.');
    }
    const updateData = req.body;
    const sql = 'UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ?';
    connection.query(sql, [updateData.title, updateData.content, updateData.author, req.params.id], (error, result) => {
        if (error) return res.status(500).send('Error updating post.');
        res.status(200).send({ id: req.params.id, ...updateData });
    });
});

// Delete a specific blog post by ID
app.delete('/posts/:id', (req, res) => {
    if (!dbConnected) {
        return res.status(503).send('Database is not connected.');
    }
    const sql = 'DELETE FROM posts WHERE id = ?';
    connection.query(sql, [req.params.id], (error, result) => {
        if (error) return res.status(500).send('Error deleting post.');
        
        if (result.affectedRows === 0) {
            return res.status(404).send('Post not found.');
        }

        res.status(200).json({ message: 'Blog post deleted successfully.' });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require('express');
const app = express();

app.use(express.json()); // to parse JSON bodies

const users = []; // fake database

// GET all users
app.get('/users', (req, res) => {
    res.json(users);
});

// POST a new user
app.post('/users', (req, res) => {
    users.push(req.body);
    res.status(201).json({ message: 'User created' });
});

// PUT (full update)
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    users[id] = req.body;
    res.json({ message: 'User updated' });
});

// PATCH (partial update)
app.patch('/users/:id', (req, res) => {
    const id = req.params.id;
    users[id] = { ...users[id], ...req.body };
    res.json({ message: 'User partially updated' });
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    users.splice(id, 1);
    res.json({ message: 'User deleted' });
});

// Start server
app.listen(3000, () => console.log('API running on http://localhost:3000'));

// app.js

const express = require('express');
const bodyParser = require('body-parser'); // For parsing request bodies
const {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
} = require('./data'); // Our in-memory data store functions

const app = express();
const PORT = process.env.PORT || 3000;

// --- 1. Setting Up the API ---

// Middleware for parsing JSON request bodies
app.use(express.json());
// Alternatively, if you prefer `body-parser` (though `express.json()` is built-in now for Express 4.16+):
// app.use(bodyParser.json());

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
    res.status(200).send('Hello, World! Welcome to the Simple Items API.');
});

// --- 2. Creating Routes (CRUD Operations) ---

// GET /items – Retrieve all items
app.get('/items', (req, res) => {
    const items = getAllItems();
    res.status(200).json(items);
});

// GET /items/:id – Retrieve a single item by ID
app.get('/items/:id', (req, res) => {
    const {
        id
    } = req.params;
    const item = getItemById(id);

    if (item) {
        res.status(200).json(item);
    } else {
        res.status(404).json({
            message: `Item with ID ${id} not found.`
        });
    }
});

// POST /items – Create a new item
app.post('/items', (req, res) => {
    const {
        name,
        description
    } = req.body;

    // --- 4. Error Handling: Validate incoming data ---
    if (!name || !description) {
        return res.status(400).json({
            message: 'Both "name" and "description" are required to create an item.'
        });
    }

    const newItem = createItem({
        name,
        description
    });
    res.status(201).json(newItem); // 201 Created
});

// PUT /items/:id – Update an item by ID
app.put('/items/:id', (req, res) => {
    const {
        id
    } = req.params;
    const {
        name,
        description
    } = req.body;

    // --- 4. Error Handling: Validate incoming data ---
    if (!name && !description) {
        return res.status(400).json({
            message: 'At least "name" or "description" is required to update an item.'
        });
    }

    const updatedItem = updateItem(id, {
        name,
        description
    });

    if (updatedItem) {
        res.status(200).json(updatedItem);
    } else {
        res.status(404).json({
            message: `Item with ID ${id} not found.`
        });
    }
});

// DELETE /items/:id – Delete an item by ID
app.delete('/items/:id', (req, res) => {
    const {
        id
    } = req.params;
    const deleted = deleteItem(id);

    if (deleted) {
        res.status(204).send(); // 204 No Content
    } else {
        res.status(404).json({
            message: `Item with ID ${id} not found.`
        });
    }
});

// --- 1. Setting Up the API: Implement error handling for invalid routes ---
// Catch-all for undefined routes (404 Not Found)
app.use((req, res, next) => {
    res.status(404).json({
        message: `Resource not found: ${req.originalUrl}`
    });
});

// Global error handler (500 Internal Server Error)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    res.status(500).json({
        message: 'Something went wrong on the server.',
        error: err.message
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

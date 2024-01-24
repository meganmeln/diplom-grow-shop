const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001; // Выберите подходящий порт

app.use(cors());

const dbPath = path.resolve('./', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

app.get('/api/categories', (req, res) => {
    const { categoryId, limit } = req.query;

    let query = 'SELECT * FROM categories WHERE 1';
    const params = [];

    if (categoryId) {
        query += ' AND id = ?';
        params.push(categoryId);
    }

    if (limit) {
        query += ' LIMIT ?';
        params.push(parseInt(limit, 10));
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/api/products', (req, res) => {
    const { categoryId, sales, price, sort, limit } = req.query;

    let query = 'SELECT * FROM products WHERE 1';
    const params = [];

    if (categoryId) {
        query += ' AND categoryId = ?';
        params.push(categoryId);
    }

    if (sales) {
        query += ' AND discont_price IS NOT NULL';
    }

    if (price) {
        const [minPrice, maxPrice] = price.split(',');

        if (minPrice && maxPrice) {
            query += ' AND price >= ?';
            params.push(parseFloat(minPrice));

            query += ' AND price <= ?';
            params.push(parseFloat(maxPrice));
        }
    }

    if (sort) {
        switch (sort) {
            case 'newest':
                query += ' ORDER BY updatedAt DESC';
                break;
            case 'price-high-low':
                query += ' ORDER BY price DESC';
                break;
            case 'price-low-high':
                query += ' ORDER BY price ASC';
                break;
            default:
                break;
        }
    }

    if (limit) {
        query += ' LIMIT ?';
        params.push(parseInt(limit, 10));
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;

    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

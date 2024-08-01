const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database(path.join(__dirname, 'database.db'));

const adminPassword = 'ghwn812#';

// Middlewares
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE guestbook (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    password TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE rsvp (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    companions INTEGER NOT NULL,
    details TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.post('/admin-login', (req, res) => {
  const { password } = req.body;
  if (password === adminPassword) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.post('/add', (req, res) => {
  const { name, message, password } = req.body;
  const timestamp = getDate().toISOString();
  db.run(`INSERT INTO guestbook (name, message, password, timestamp) VALUES (?, ?, ?, ?)`, [name, message, password, timestamp], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

app.post('/delete', (req, res) => {
  const { id, password } = req.body;
  db.get(`SELECT password FROM guestbook WHERE id = ?`, [id], (err, row) => {
    if (err || !row || row.password !== password) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    db.run(`DELETE FROM guestbook WHERE id = ?`, [id], function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.sendStatus(200);
    });
  });
});

app.get('/entries', (req, res) => {
  db.all(`SELECT * FROM guestbook ORDER BY timestamp DESC LIMIT 3`, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});

// 추가: 현재 시간을 한국 표준시로 변환하는 함수
function getDate() {
  const now = new Date();
  // now.setHours(now.getHours() + 9); // 한국 표준시가 UTC+9이므로 9시간을 더합니다.
  return now;
}

app.get('/all-entries', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  db.all(`SELECT * FROM guestbook ORDER BY timestamp DESC LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.get(`SELECT COUNT(*) as count FROM guestbook`, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        entries: rows,
        totalEntries: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page
      });
    });
  });
});

app.post('/rsvp', (req, res) => {
  const { name, companions, details } = req.body;
  db.run(`INSERT INTO rsvp (name, companions, details) VALUES (?, ?, ?)`, [name, companions, details], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

app.get('/rsvps', (req, res) => {
  db.all(`SELECT * FROM rsvp ORDER BY timestamp DESC`, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    rows.forEach(row => {
      row.timestamp = new Date(new Date(row.timestamp).getTime()); // Convert to KST
    });
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

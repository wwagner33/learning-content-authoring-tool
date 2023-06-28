const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Create a new page
app.post('/page', (req, res) => {
  // Create a new page
  // You'll need to replace this with your own logic
  res.json({ id: Date.now(), content: '' });
});

// Save a page
app.put('/page/:id', (req, res) => {
  // Save the page content to a file
  fs.writeFile(path.join(__dirname, `./pages/${req.params.id}.md`), req.body.content, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to save page' });
    } else {
      res.json({ message: 'Page saved' });
    }
  });
});

// Download a page
app.get('/page/:id', (req, res) => {
  // Send the page file
  res.sendFile(path.join(__dirname, `./pages/${req.params.id}.md`));
});

app.listen(3000, () => console.log('API server listening on port 3000'));

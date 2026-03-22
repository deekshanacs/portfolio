const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'content.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Get all content
app.get('/api/content', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read content' });
  }
});

// Update content
app.post('/api/content', async (req, res) => {
  try {
    const content = req.body;
    await fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// Serve index for unknown routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Website running on http://localhost:${PORT}`);
});

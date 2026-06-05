const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Determine if we should serve from the built 'dist' directory or the root directory
const distPath = path.join(__dirname, 'dist');
const useDist = fs.existsSync(distPath);
const publicDir = useDist ? distPath : __dirname;

app.use(express.static(publicDir));

// Route to catalog specifically if accessed without extension
app.get('/catalog', (req, res) => {
  const file = path.join(publicDir, 'catalog.html');
  if (fs.existsSync(file)) {
    res.sendFile(file);
  } else {
    res.status(404).send('Catalog page not found');
  }
});

// Fallback to index.html for all other non-static file routes
app.get('*', (req, res) => {
  const file = path.join(publicDir, 'index.html');
  if (fs.existsSync(file)) {
    res.sendFile(file);
  } else {
    res.status(404).send('Home page not found');
  }
});

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`ZooNefrit Express server is running.`);
  console.log(`Local URL: http://localhost:${PORT}`);
  console.log(`Serving files from: ${publicDir}`);
  console.log(`Mode: ${useDist ? 'Production (dist)' : 'Development (root)'}`);
  console.log(`=========================================`);
});

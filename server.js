const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const MUSIC_DIR = path.join(__dirname, 'music'); // Directory containing MP3 files

app.use(cors());
app.use(express.static(MUSIC_DIR));

// ✅ Route for homepage
app.get('/', (req, res) => {
    res.send('<h1>🎵 MP3 Server is Running</h1><p>Go to <a href="/songs">/songs</a> to see available MP3 files.</p>');
});

// ✅ Route to list MP3 files
app.get('/songs', (req, res) => {
    if (!fs.existsSync(MUSIC_DIR)) {
        return res.status(500).json({ error: "Music directory does not exist" });
    }

    fs.readdir(MUSIC_DIR, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read directory", details: err.message });
        }
        const mp3Files = files.filter(file => file.endsWith('.mp3'));
        res.json(mp3Files.length > 0 ? mp3Files : { message: "No MP3 files found" });
    });
});

app.listen(PORT, () => {
    console.log(`🎵 Server running at http://localhost:${PORT}/`);
});

var bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const shortUrl = require('node-url-shortener');
const app = express();

// CORS Configuration
app.use(cors({
    origin: 'https://url-shortner-site.netlify.app', // Removed trailing slash
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

// Handle preflight OPTIONS requests
app.options('*', cors());

// Middleware
app.use(bodyParser.json());

// Endpoint to shorten URL
app.post('/shorten', (req, res) => {
    const urlToShorten = req.body.url;

    if (!urlToShorten) {
        return res.status(400).json({ error: 'No URL provided' });
    }

    shortUrl.short(urlToShorten, (err, shortUrl) => {
        if (err) {
            console.error('Error shortening URL:', err);
            return res.status(500).json({ error: 'Error shortening the URL' });
        }
        res.json({ shortUrl });
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
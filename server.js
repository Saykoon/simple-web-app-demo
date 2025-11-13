const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running!',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Jan Kowalski', email: 'jan@example.com' },
        { id: 2, name: 'Anna Nowak', email: 'anna@example.com' },
        { id: 3, name: 'Piotr Wiśniewski', email: 'piotr@example.com' }
    ];
    res.json(users);
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
    }
    
    // Simulate processing
    console.log('Otrzymano wiadomość:', { name, email, message });
    
    res.json({ 
        success: true, 
        message: 'Wiadomość została wysłana pomyślnie!' 
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Coś poszło nie tak!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Strona nie została znaleziona' });
});

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Serwer działa na porcie ${PORT}`);
        console.log(`Otwórz http://localhost:${PORT} w przeglądarce`);
    });
}

module.exports = app;
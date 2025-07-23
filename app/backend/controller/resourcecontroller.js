const { poolPromise } = require('../models/db');
exports.add = async (req, res) => {
    const { Name, Email,Website } = req.body;
    const promise = await poolPromise;
    try {
        const result = await promise
            .request()
            .input('Name', Name)
            .input('Email', Email)
            .input('Website', Website)
            .query('INSERT INTO Resource (Name, Email, Website) VALUES (@Name, @Email, @Website)');
        res.json({ message: 'Resource added successfully' });
    } catch (e) {
        console.error('Error adding resource:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
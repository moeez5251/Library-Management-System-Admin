const { poolPromise } = require('../models/db');
exports.inserting = async (req, res) => {
    const { Book_ID, Book_Title, Author, Category, Language, Total_Copies, Status } = req.body;
    console.log(req.body);
    if (!Book_ID || !Book_Title || !Author || !Category || !Language || !Total_Copies || !Status) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input('Book_ID', Book_ID)
            .input('Book_Title', Book_Title)
            .input('Author', Author)
            .input('Category', Category)
            .input('Language', Language)
            .input('Total_Copies', Total_Copies)
            .input('Status', Status)
            .query('INSERT INTO Books (Book_ID, Book_Title, Author, Category, Language, Total_Copies, Status) VALUES (@Book_ID, @Book_Title, @Author, @Category, @Language, @Total_Copies, @Status)');

        res.status(201).json({ message: 'Book inserted successfully' });
    } catch (err) {
        console.error('Error inserting book:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.getting = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Books');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
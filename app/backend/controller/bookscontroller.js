const { poolPromise } = require('../models/db');
const { v4: uuidv4 } = require('uuid');
exports.inserting = async (req, res) => {
    const { Book_Title, Author, Category, Language, Total_Copies, Status, Pages, Price } = req.body;
    console.log(req.body);
    if (!Book_Title || !Author || !Category || !Language || !Total_Copies || !Status || !Pages, !Price) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input('Book_ID', uuidv4())
            .input('Book_Title', Book_Title)
            .input('Author', Author)
            .input('Category', Category)
            .input('Language', Language)
            .input('Total_Copies', Total_Copies)
            .input('Status', Status)
            .input('Pages', Pages)
            .input('Price', Price)
            .query('INSERT INTO Books (Book_ID, Book_Title, Author, Category, Language, Total_Copies, Status,Pages,Price) VALUES (@Book_ID, @Book_Title, @Author, @Category, @Language, @Total_Copies, @Status,@Pages,@Price)');

        res.status(201).json({ message: 'Book Added successfully' });
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
exports.getbyID = async (req, res) => {
    try {
        const { ID } = req.body;
        if (!ID) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const TD = ID
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input('ID', ID)
            .query('SELECT * FROM Books WHERE Book_ID = @ID');
        res.json(result.recordset);
    }
    catch (err) {
        console.error('Error fetching Data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
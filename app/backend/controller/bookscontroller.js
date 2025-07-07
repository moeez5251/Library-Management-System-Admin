const { poolPromise } = require('../models/db');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
exports.inserting = async (req, res) => {
    const { Book_Title, Author, Category, Language, Total_Copies, Status, Pages, Price, API } = req.body;
    try {
        if (API !== process.env.XLMS_API) {
            return res.status(400).json({ message: 'Invalid API' });
        }
    }
    catch (err) {
        console.error('Error in API validation:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!Book_Title || !Author || !Category || !Language || !Total_Copies || !Status || !Pages || !Price) {
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
    const { API } = req.body
    if (API !== process.env.XLMS_API) {
        return res.status(400).json({ error: 'Invalid API' });
    }
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
exports.updatebook = async (req, res) => {
    const { Book_ID, Book_Title, Author, Category, Language, Total_Copies, Status, Pages, Price } = req.body;
    if (!Book_ID || !Book_Title || !Author || !Category || !Language || !Status || !Pages || !Price) {
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
            .input('Pages', Pages)
            .input('Price', Price)
            .query('UPDATE Books SET Book_Title = @Book_Title, Author = @Author, Category = @Category, Language = @Language, Total_Copies = @Total_Copies, Status = @Status, Pages = @Pages, Price = @Price WHERE Book_ID = @Book_ID');
        res.json({ message: 'Book updated successfully' });
    } catch (err) {
        console.error('Error updating book:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.deletebook = async (req, res) => {
    const ID_arr = req.body;

    if (!Array.isArray(ID_arr) || ID_arr.length === 0) {
        return res.status(400).json({ error: 'ID array is required and cannot be empty' });
    }

    try {
        const pool = await poolPromise;
        const request = pool.request();

        const idParams = ID_arr.map((id, index) => {
            const paramName = `id${index}`;
            request.input(paramName, id);
            return `@${paramName}`;
        });

        const query = `DELETE FROM Books WHERE Book_ID IN (${idParams.join(',')})`;

        await request.query(query);

        res.json({ message: 'Books deleted successfully' });
    } catch (err) {
        console.error('Error deleting books:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getbycolumnname = async (req, res) => {
    const {column}= req.body;
    if ( column.length === 0) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const query = `Select DISTINCT ${column.join(',')} from Books`;
        const result = await request.query(query);
        res.json(result.recordset);
    }
    catch {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
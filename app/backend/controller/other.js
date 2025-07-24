const { poolPromise } = require('../models/db');
exports.getbookdata = async (req, res) => {
    const pool = await poolPromise;
    try {
        const result = await pool.request()
            .query('SELECT * FROM books');
        const totalusers = await pool.request()
            .query('SELECT COUNT(*) AS Total_Users FROM users');
        const Totalusers = totalusers.recordset[0].Total_Users;
        const totalborrower = await pool.request()
            .query('SELECT COUNT(*) AS Total_Borrowers FROM borrower');
        const Totalborrowers = totalborrower.recordset[0].Total_Borrowers;
        const Totalbooks = result.recordset.length;
        const availablebooks = result.recordset.filter(book => book.Status == 'Available').length;
        const overduebooks = result.recordset.filter(book => book.Status == 'Overdue').length;
        res.json({
            Totalbooks: Totalbooks,
            Totalusers: Totalusers,
            Totalborrowers: Totalborrowers,
            availablebooks: availablebooks,
            overduebooks: overduebooks,
        })
    }
    catch {
        res.status(500).send('Error retrieving book data');
    }
}
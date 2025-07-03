const bcrypt = require('bcrypt');
const { poolPromise } = require('../models/db');
exports.getalllenders = async (req, res) => {
    const { API } = req.body;
    if (API !== process.env.XLMS_API) {
        return res.status(400).json({ message: 'Invalid API' });
    }
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM borrower');
        const lenders = result.recordset;
        res.status(200).json(lenders);

    } catch (error) {
        console.error('Error fetching lenders:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}
exports.getlenderbyid = async (req, res) => {
    try {
        const { ID } = req.body;
        if (!ID) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input('ID', ID)
            .query('SELECT * FROM borrower WHERE Borrower_ID = @ID');
        const lender = result.recordset[0];
        if (!lender) {
            return res.status(404).json({ message: 'Lender not found' });
        }
        res.status(200).json(lender);
    } catch (error) {
        console.error('Error fetching lender by ID:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}
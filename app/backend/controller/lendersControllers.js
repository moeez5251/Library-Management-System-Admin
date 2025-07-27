const { poolPromise } = require('../models/db');
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('./mailer');
const { generatetoken } = require('./tokengenerator')
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
        const userid = await result.recordset[0].user_id

        const useremail = await pool
            .request()
            .input('ID', userid)
            .query('SELECT Email FROM users WHERE User_id = @ID');
        if (useremail.recordset.length <= 0) {
            return res.status(404).json({ message: 'User was Deleted' });
        }
        lender.Email = useremail.recordset[0].Email;
        res.status(200).json(lender);
    } catch (error) {
        console.error('Error fetching lender by ID:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}
exports.addbook = async (req, res) => {
    try {

        const data = req.body
        let existinguser = false
        let totalaccountcost = 0
        const pool = await poolPromise;

        const existingUserResult = await pool.request()
            .input('email', data.Email)
            .query('SELECT COUNT(*) AS count FROM users WHERE email = @email');
        if (existingUserResult.recordset[0].count > 0) {
            existinguser = true
        }
        let userId = `${data.Lendername[0].toUpperCase()}${uuidv4().replace(/-/g, "").slice(0, 8)}`;
        const password = uuidv4().replace(/-/g, "").slice(0, 8) + uuidv4().replace(/-/g, "").slice(0, 8);
        const hashedPassword = await bcrypt.hash(password, 10);
        const p = await pool.request()
            .input('Book_Title', data.BookTitle)
            .input('Author', data.Author)
            .input('Category', data.Category)
            .query("select Price,Book_ID,Available from books where Book_Title=@Book_Title and Author=@Author and Category=@Category")
        const Price = p.recordset[0].Price
        const BookID = p.recordset[0].Book_ID
        const Copies = p.recordset[0].Available
        if (Copies < data.CopiesLent) {
            return res.status(400).json({ error: 'Not enough copies available' });
        }
        else {
            await pool
                .request()
                .input('Book_ID', BookID)
                .input('Available', (Number(Copies) - Number(data.CopiesLent)).toString())
                .query(` UPDATE books 
                SET 
                Available = @Available,
                Status = CASE 
                            WHEN @Available = 0 THEN 'Out of stock' 
                            ELSE 'Available' 
                        END
                OUTPUT INSERTED.Available, INSERTED.Status
                WHERE Book_ID = @Book_ID`)
        }
        if (!existinguser) {
            await pool
                .request()
                .input('User_id', userId)
                .input('User_Name', data.Lendername)
                .input('Email', data.Email)
                .input('Role', data.Role)
                .input('Membership_Type', 'English')
                .input('Password', hashedPassword)
                .input('Cost', Price * data.CopiesLent)
                .input('Status', 'Active')
                .query(`
                INSERT INTO users (User_id, User_Name, Email, Role, Membership_Type, Password, Cost, Status)
                OUTPUT INSERTED.User_id
                VALUES (@User_id, @User_Name, @Email, @Role, @Membership_Type, @Password, @Cost, @Status);
            `);
            totalaccountcost = Price * data.CopiesLent
        }
        else {
            const id = await pool
                .request()
                .input('email', data.Email)
                .query('Select User_id,Cost,Status from users where email=@email')
            userId = id.recordset[0].User_id
            if (id.recordset[0].Status.trim() === 'Deactivated') {
                return res.status(400).json({ error: 'Unable to lend. This account is deactivated' });
            }
            const updatecost = await pool
                .request()
                .input('User_id', userId)
                .input('Cost', (Number(id.recordset[0].Cost) + Number(Price) * data.CopiesLent).toString())
                .query(`  UPDATE users 
                SET Cost = @Cost 
                OUTPUT INSERTED.Cost
                WHERE User_id = @User_id`)
            totalaccountcost = updatecost.recordset[0].Cost

        }
        const insert = await pool
            .request()
            .input('user_id', userId)
            .input('Name', data.Lendername)
            .input('PhoneNumber', data.PhoneNumber)
            .input('BookTitle', data.BookTitle)
            .input('Author', data.Author)
            .input('Category', data.Category)
            .input('IssuedDate', data.IssuedDate)
            .input('DueDate', data.DueDate)
            .input('CopiesLent', data.CopiesLent)
            .input('FinePerDay', data.Fine)
            .input('Price', Price)
            .input('BookID', BookID)
            .query(`INSERT INTO borrower (user_id, Name, PhoneNumber, BookTitle, Author, Category, IssuedDate, DueDate, CopiesLent, FinePerDay, Price, Book_ID) VALUES (@user_id, @Name, @PhoneNumber, @BookTitle, @Author, @Category, @IssuedDate, @DueDate, @CopiesLent, @FinePerDay, @Price, @BookID)`);
        let link = ""
        if (!existinguser) {
            link = await generatetoken(userId)
        }
        const text = `
        Hello ${data.Lendername},
        ${link.length > 0 ? `Your account has been successfully created and the book has been issued. Below are your details:` : "Your Account and Book Details are :"
            }

        ${link.length > 0 ?
                `
                ===========================
                🔐 IMPORTANT SECURITY NOTICE:
                ===========================
                Your account has been created with a default password.
                Please change your password immediately for security purposes.
               Change your password here:
            https://xlms-admin.netlify.app/change-password`: ""
            }

        ===========================
        Login Credentials:
        ---------------------------
        Email: ${data.Email}
        Total Account Cost: Rs. ${totalaccountcost}

        Book Issued Details:
        ---------------------------
        Title: ${data.BookTitle}
        Author: ${data.Author}
        Category: ${data.Category}
        Issued Date: ${data.IssuedDate}
        Due Date: ${data.DueDate}
        Copies Lent: ${data.CopiesLent}
        Fine Per Day: Rs. ${data.Fine}
        Book Price: Rs. ${Price}
        Total Cost: Rs. ${Price * data.CopiesLent}
        
        ${link.length > 0 ?
                ` Please keep your login credentials safe and return the book on or before the due date to avoid fines.
            
            You can log in here after changing your password:
            https://xlms-admin.netlify.app`: ""
            }

        If you have any questions, feel free to reach out to us.

        Thank you,  
        XLMS


        `;

        const html = `
            <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <title>Account and Book Details</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            color: #333;
            padding: 20px;
            }
            .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            max-width: 600px;
            }
            h2 {
            color: #4CAF50;
            }
            .info {
            background-color: #f1f1f1;
            padding: 10px 15px;
            border-radius: 6px;
            margin: 10px 0;
            font-family: monospace;
            }
            .section-title {
            font-weight: bold;
            margin-top: 20px;
            }
            .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
            }
            .button {
            padding: 10px 16px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 15px;
            }
            .primary-button {
            background-color: #f44336; /* red for urgency */
            color: white;
            }
            .secondary-button {
            background-color: #4CAF50;
            color: white;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h2>Welcome, ${data.Lendername}!</h2>
            ${link.length > 0 ?
                `  <p>Your account has been successfully created and the book has been issued.</p>`
                : `<p>Your account and book details are:</p>`
            }

            ${link.length > 0 ?
                `<p style="color: #c0392b; font-weight: bold;">
                    For security reasons, please change your password immediately before logging in. All new accounts have a default password set.
                    </p>
                 <a style="color:white;" href=${link} class="button primary-button">Change Password Now</a>` : ""
            }

            <p class="section-title">Login Credentials</p>
            <p class="info">Email: <strong>${data.Email}</strong></p>
            <p class="info">Total Account Cost: <strong>Rs. ${totalaccountcost}</strong></p>

            <p class="section-title">Book Issued</p>
            <p class="info">Title: <strong>${data.BookTitle}</strong></p>
            <p class="info">Author: <strong>${data.Author}</strong></p>
            <p class="info">Category: <strong>${data.Category}</strong></p>
            <p class="info">Issued Date: <strong>${data.IssuedDate}</strong></p>
            <p class="info">Due Date: <strong>${data.DueDate}</strong></p>
            <p class="info">Copies Lent: <strong>${data.CopiesLent}</strong></p>
            <p class="info">Fine Per Day: <strong>Rs. ${data.Fine}</strong></p>
            <p class="info">Book Price: <strong>Rs. ${Price}</strong></p>
            <p class="info">Total Cost: <strong>Rs. ${Price * data.CopiesLent}</strong></p>
            ${link.length > 0 ?
                `<a style="color:white;" href="https://xlms-admin.netlify.app" class="button secondary-button">Log In After Changing Password</a>` : ""
            }

            <p class="footer">
            If you did not request this account or book, please contact our support team immediately.<br><br>
            &copy; 2025 XLMS. All rights reserved.
            </p>
        </div>
        </body>
        </html>

`;

        sendEmail(data.Email, link.length > 0 ? "Thank you for creating an account with XLMS" : "Account and Book Details", text, html);


        res.status(200).json({ message: 'Book issued successfully' });

    }
    catch (e) {
        res.status(500).json({ message: 'Server error', error: e });
    }
}
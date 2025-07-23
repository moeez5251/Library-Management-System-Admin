const { poolPromise } = require('../models/db');

exports.addnotifications = async (req, res) => {
    const { Userid, Message } = req.body;
    const promise = await poolPromise;
    const CreatedAt = new Date(Date.now() + 60 * 1000);
    const created = CreatedAt.toLocaleString("en-PK", {
        timeZone: "Asia/Karachi",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });
    try {

        const result = await promise
            .request()
            .input('Userid', Userid)
            .input('Message', Message)
            .input('CreatedAt', created)
            .input('IsRead', false)
            .query('INSERT INTO Notifications (Userid, Message, CreatedAt,IsRead) VALUES (@Userid, @Message ,  @CreatedAt, @IsRead)');
        res.json({ message: 'Notification added successfully' });

    }
    catch (e) {
        console.error('Error adding notification:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

exports.getnotifications = async (req, res) => {
    const { Userid } = req.body;
    const promise = await poolPromise;
    try {
        const result = await promise
            .request()
            .input('Userid', Userid)
            .input('IsRead', false)
            .query('SELECT * FROM Notifications WHERE UserId = @Userid AND IsRead = @IsRead ORDER BY CreatedAt DESC');
        res.json(result.recordset);
    } catch (e) {
        console.error('Error fetching notifications:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const { poolPromise } = require('../models/db');

exports.addnotifications = async (req, res) => {
    const {  Message } = req.body;
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
            .input('Userid', req.user.id)
            .input('Message', Message)
            .input('CreatedAt', created)
            .input('IsRead', false)
            .query('INSERT INTO Notifications (Userid, Message, CreatedAt,IsRead) VALUES (@Userid, @Message ,  @CreatedAt, @IsRead)');
        await promise
            .request()
            .input('IsRead', true)
            .query('Delete FROM Notifications WHERE IsRead = @IsRead');
        res.json({ message: 'Notification added successfully' });

    }
    catch (e) {
        console.error('Error adding notification:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

exports.getnotifications = async (req, res) => {
    const promise = await poolPromise;
    try {
        const result = await promise
            .request()
            .input('Userid', req.user.id)
            .input('IsRead', false)
            .query('SELECT * FROM Notifications WHERE UserId = @Userid AND IsRead = @IsRead ORDER BY CreatedAt DESC');
        res.json(result.recordset);
    } catch (e) {
        console.error('Error fetching notifications:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.markasread = async (req, res) => {
    const { NotificationId
    } = req.body;
    const promise = await poolPromise;
    try {
        if (NotificationId) {
            const result = await promise
                .request()
                .input('Userid', req.user.id)
                .input('NotificationId', NotificationId)
                .input('IsRead', true)
                .query('UPDATE Notifications SET IsRead = @IsRead WHERE UserId = @Userid AND Id = @NotificationId');
            res.json({ message: 'Notification marked as read successfully' });
        }
        else {
            const result = await promise
                .request()
                .input('Userid', req.user.id)
                .input('IsRead', true)
                .query('UPDATE Notifications SET IsRead = @IsRead WHERE UserId = @Userid');
            res.json({ message: 'All notifications marked as read successfully' });
        }
    } catch (e) {
        console.error('Error marking notification as read:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
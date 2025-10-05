const { google } = require("googleapis");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const USER_EMAIL = process.env.GOOGLE_USER_EMAIL;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendEmail = async (to, subject, text, html) => {
  try {
    // 🔄 Ensure access token is fresh before sending
    const { token } = await oAuth2Client.getAccessToken();
    oAuth2Client.setCredentials({ access_token: token, refresh_token: REFRESH_TOKEN });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const messageParts = [
      `From: "XLMS Support" <${USER_EMAIL}>`,
      `To: ${to}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=UTF-8",
      "",
      html || text,
    ];

    const message = messageParts.join("\n");

    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encodedMessage },
    });

    console.log("✅ Email sent successfully!");
    return res.data;

  } catch (err) {
    console.error("❌ Error sending email:", err.message);

    if (err.message.includes("invalid_grant")) {
      console.log("⚠️ Token expired or revoked. Attempting to refresh...");
      try {
        const { token } = await oAuth2Client.getAccessToken();
        oAuth2Client.setCredentials({ access_token: token, refresh_token: REFRESH_TOKEN });
        console.log("🔄 Token refreshed successfully. Retrying...");
        return await sendEmail(to, subject, text, html);
      } catch (refreshErr) {
        console.error("🚨 Failed to refresh token:", refreshErr.message);
      }
    }

    throw err;
  }
};

module.exports = { sendEmail };

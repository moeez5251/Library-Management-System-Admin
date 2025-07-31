# 📚 Library Management System

A full-stack web application designed to modernize and simplify library operations with an intuitive interface and real-time functionality. Built with **Next.js** (frontend) and **Node.js/Express** (backend), and powered by **Microsoft SQL Server** for reliable data management. 🚀

---

## ✨ Features

* 🔒 **User Authentication & Authorization** – Secure login using JWT tokens.
* 📖 **Book Management** – Add, update, delete, and search for books.
* 👥 **User Management** – Register and manage members with borrowing history.
* 📚 **Lending System** – Issue/return books with due date tracking.
* 🔔 **Real-Time Notifications** – Alerts for due books, returns, and messages.
* 📧 **Email & OTP Verification** – Secure account recovery.
* 📊 **Admin Dashboard** – Interactive charts and stats for quick insights.
* 📱 **Responsive Design** – Fully optimized for both desktop and mobile devices.

---

## 🛠️ Tech Stack

### 🔹 Frontend

| Tool                                                                                                | Description                               |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js\&logoColor=white)               | React framework for server-side rendering |
| ![React](https://img.shields.io/badge/React-20232a?logo=react\&logoColor=61DAFB)                    | Component-based UI library                |
| ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css\&logoColor=white) | Utility-first CSS framework               |
| ![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-000000?logo=iconify\&logoColor=white)     | Icon pack for clean visual elements       |

### 🔸 Backend

| Tool                                                                                           | Description                 |
| ---------------------------------------------------------------------------------------------- | --------------------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)          | JavaScript runtime          |
| ![Express](https://img.shields.io/badge/Express.js-404d59?logo=express\&logoColor=white)       | Web framework for REST APIs |
| ![JWT](https://img.shields.io/badge/JWT-000000?logo=json-web-tokens\&logoColor=white)          | Token-based authentication  |
| ![MSSQL](https://img.shields.io/badge/MSSQL-CC2927?logo=microsoft-sql-server\&logoColor=white) | Relational database         |

### ⚙️ Utilities

* Pagination Controls
* Email & OTP Services
* Real-time Notifications (via Socket.IO)

### ☁️ Deployment

| Platform                                                                              | Purpose            |
| ------------------------------------------------------------------------------------- | ------------------ |
| ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify\&logoColor=white) | Frontend Hosting   |
| ![Nixpacks](https://img.shields.io/badge/Nixpacks-2088ff?logo=nixos\&logoColor=white) | Backend Build Tool |

---

## 🚀 Getting Started

### 📦 Prerequisites

* Node.js v18+ and npm/yarn/pnpm/bun
* Microsoft SQL Server
* Environment variables configured

### 🧩 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/moeez5251/Library-Management-System.git
   cd Library-Management-System
   ```

2. **Install dependencies:**

   * Frontend:

     ```bash
     npm install  # or yarn/pnpm/bun install
     ```

   * Backend (if separate):

     ```bash
     cd app/backend
     npm install
     ```

3. **Configure Environment Variables:**

   Create `.env.local` for Next.js and `.env` in `/app/backend`.

   ```env
   Email=your_email
   Password=your_email_app_password
   user=your_db_user
   DB_PASS=your_db_password
   server=your_db_server
   database=your_database_name
   URL=http://localhost:3000
   JWT=your_jwt_secret
   ```

4. **Run the Application:**

   * Frontend (root):

     ```bash
     npm run dev
     ```

     App runs at: [http://localhost:3000](http://localhost:3000)

   * Backend (`/app/backend`):

     ```bash
     node server.js
     ```

     API available at: [http://localhost:5000/api](http://localhost:5000/api)

---

## 🗂️ Project Structure

### 📁 Frontend

* `app/` – Pages and layout (e.g., `page.js`, `layout.js`)

  * `admin/` – Admin dashboard and stats
  * `members/`, `login/`, `reset-password/` – User interactions
* `components/` – Reusable UI (pagination, modals, navbars)
* `app/globals.css` – Global styling

### 📁 Backend

* `server.js` – Express server setup
* `models/db.js` – SQL Server DB connection using `mssql`
* `controller/` & `routes/`:

  * `auth.js` – Auth logic (JWT)
  * `user.js`, `bookscontroller.js` – User/book logic
  * `lendersControllers.js` – Lending logic
  * `notificationscontroller.js`, `mails.js` – Notifications & OTP

---

## 📊 Admin Dashboard

* View live stats: total books, users, issued books, overdue returns
* Charts powered by API: `/api/other/getbookdata`

---

## ☁️ Deployment Guide

* **Frontend**: Deploy with [Netlify](https://www.netlify.com/)
* **Backend**: Use [Nixpacks](https://nixpacks.com/docs) or platforms like Render, Railway, or Heroku
* Follow [Next.js Deployment Docs](https://nextjs.org/docs/deployment) for custom setups

---

## 📖 Resources

* [Next.js Docs](https://nextjs.org/docs)
* [Express.js Docs](https://expressjs.com/)
* [MSSQL for Node.js](https://www.npmjs.com/package/mssql)
* [Socket.IO Docs](https://socket.io/docs/v4/)
* [Netlify Docs](https://docs.netlify.com/)
* [Nixpacks Docs](https://nixpacks.com/docs/)

---

## 🤝 Contributing

We welcome all contributions! 🛠️

1. Fork the repo 🍴
2. Create a new branch

   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes

   ```bash
   git commit -m "Add your feature"
   ```
4. Push to GitHub

   ```bash
   git push origin feature/your-feature
   ```
5. Submit a Pull Request 📬

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

For questions or support, [open an issue](https://github.com/moeez5251/Library-Management-System/issues) or reach out to the maintainers.

---

**Happy Managing Your Library!** 📚✨

---



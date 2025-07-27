# 📚 Library Management System

Welcome to the  **Library Management System** , a full-stack web application designed to streamline library operations with a modern, user-friendly interface. Built with **Next.js** for the frontend and **Node.js/Express** for the backend, this project integrates seamlessly with a **Microsoft SQL Server** database to manage books, users, lending processes, and notifications. 🚀

## ✨ Overview

The Library Management System is a comprehensive solution for libraries, offering a robust set of features to simplify book and user management, lending operations, and notifications. Key features include:

* 🔒  **User Authentication & Authorization** : Secure login with JWT-based authentication.
* 📖  **Book Management** : Add, update, delete, and search books in the catalog.
* 👥  **User Management** : Register users and track their borrowing history.
* 📚  **Lending System** : Manage book lending and returns with due date tracking.
* 🔔  **Notifications** : Real-time notifications for users and admins.
* 📧  **Email & OTP Verification** : Secure account recovery with OTP-based emails.
* 📊  **Admin Dashboard** : Visualize library stats with charts and data tables.
* 📱  **Responsive Design** : Optimized for both desktop and mobile devices.

## 🛠️ Tech Stack

* **Frontend** :
* ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)  **Next.js** : React-based framework for dynamic UI.
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)  **React** : Component-based UI library.
* ![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)  **Tailwind CSS** : Utility-first CSS framework.
* ![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-000000?logo=iconify&logoColor=white)  **Lucide Icons** : Beautiful icon library.
* **Backend** :
* ![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)  **Node.js** : JavaScript runtime for server-side logic.
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB)  **Express.js** : Web framework for API development.
* ![JWT](https://img.shields.io/badge/JWT-000000?logo=json-web-tokens&logoColor=white)  **JWT** : Secure authentication for APIs. 🔐
* **Database** : MS SQL 🗄️
* ![Microsoft SQL Server](https://img.shields.io/badge/MSSQL-CC2927?logo=microsoft-sql-server&logoColor=white)**Microsoft SQL Server** : Relational database for data management. 🗄️
* **Utilities** :
* ![Utilities](https://img.shields.io/badge/Utilities-Utilities-blue?logo=gear&logoColor=white)  **Utilities** : Pag ination controls, email services, and more. ⚙️
* **Deployment & Build** :
* ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=flat&logo=netlify&logoColor=white)  **Netlify** : Hosting and deployment for the frontend.
* ![Nixpacks](https://img.shields.io/badge/Nixpacks-2088ff?style=flat)  **Nixpacks** : Automated build and deployment tool. ☁️

## 🚀 Getting Started

### Prerequisites

* ![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white) Node.js (v18 or higher) 🟢
* npm, yarn, pnpm, or bun 📦
* ![Microsoft SQL Server](https://img.shields.io/badge/MSSQL-CC2927?logo=microsoft-sql-server&logoColor=white) Microsoft SQL Server instance 🗄️
* Environment variables for database, JWT, and email services 🔧

### Installation

1. **Clone the Repository** :

```bash
   git clone https://github.com/moeez5251/Library-Management-System.git
   cd Library-Management-System
```

1. **Install Dependencies** :

* For the frontend (from project root):
  ```bash
  npm install
  # or
  yarn install
  # or
  pnpm install
  # or
  bun install
  ```
* For the backend (if separate, from `/app/backend`):
  ```bash
  npm install
  ```

1. **Configure Environment Variables** :

* Create `.env.local` (for Next.js) in the project root and `.env` (for backend) in `/app/backend`.
* Add required variables (e.g., database credentials, JWT secret, email service keys):
  ```env
  Email=your_email
  Password=your_email_app_password
  user=your_db_user
  DB_PASS=your_db_pass
  server=your_db_server
  database=your_db_name
  URL=http://localhost:3000
  JWT=secret_token
<<<<<<< HEAD
=======

>>>>>>> 3c00a60539d82a44bfc57f631c3a9625abc9a3e5
  ```

1. **Run the Application** :

* **Frontend** (from project root):

  ```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  # or
  bun dev
  ```

  Open [http://localhost:3000](http://localhost:3000/) to view the app. 🌐
* **Backend** (from `/app/backend`):

  ```bash
  node server.js
  ```

  APIs will be available at [http://localhost:5000/api](http://localhost:5000/api). 🔗

## 🗂️ Project Structure

### Frontend

* **Pages & Layouts** (`/app`):
  * Main entry: `app/page.js` 📄
  * Layouts: `app/layout.js` 🖼️
  * Sub-folders: `app/admin`, `app/members`, `app/login`, `app/reset-password` 🗂️
* **Components** (`/components`):
  * Reusable UI elements like cards, modals, navigation bars, and pagination controls (`table/pagination.jsx`) 🧩
  * Global styles in `app/globals.css` 🎨
* **Admin Dashboard** :
* Displays library stats (books, users, lending, overdue) with charts and tables 📊
* Fetches data from `/api/other/getbookdata` 📈

### Backend

* **Server** (`/app/backend/server.js`):

  * Initializes Express with CORS, JSON parsing, and JWT middleware 🔧
* **Database** (`/app/backend/models/db.js`):

  * MSSQL connection pool using the `mssql` package 🗄️
* **Controllers & Routes** (`/app/backend/controller`, `/app/backend/routes`):

  * **Auth** : Login/logout (`auth.js`) 🔐
  * **Users** : Registration, profile updates (`user.js`) 👤
  * **Books** : CRUD operations (`bookscontroller.js`, `book.js`) 📚
  * **Lending** : Issue/return books (`lendersControllers.js`, `lenders.js`) 📖
  * **Notifications** : Real-time alerts (`notificationscontroller.js`) 🔔
  * **Emails** : OTP and account notifications (`mails.js`, `/api/mail`) 📧
  * **Resources** : Manage external resources (`resourcecontroller.js`, `/api/resource`) 🌐

## 🎨 Features & Highlights

* **Interactive UI** : Data tables with pagination, modals, and charts for a seamless experience. 📈
* **Secure APIs** : JWT-based authentication ensures protected endpoints. 🔐
* **Real-Time Notifications** : Powered by Socket.IO for timely alerts. 🔔
* **Scalable Design** : Modular frontend and backend for easy maintenance and extension. 🛠️

## ☁️ Deployment & Build

* Deploy the frontend using ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=flat&logo=netlify&logoColor=white) for seamless hosting.
* Use ![Nixpacks](https://img.shields.io/badge/Nixpacks-2088ff?style=flat) for automated builds and deployments.
* For manual deployment, follow the [Next.js deployment guide](https://nextjs.org/docs/deployment) or configure your backend server with a platform like Render or Heroku.

## 📖 Learn More

* [Next.js Documentation](https://nextjs.org/docs) 📚
* [Express.js Documentation](https://expressjs.com/) ⚙️
* [MSSQL Node.js Package](https://www.npmjs.com/package/mssql) 🗄️
* [Socket.IO Documentation](https://socket.io/docs/v4/) 🔔
* [Netlify Documentation](https://docs.netlify.com/) ☁️
* [Nixpacks Documentation](https://nixpacks.com/docs/) 🛠️

## 🤝 Contributing

We welcome contributions! To get started:

1. Fork the repository. 🍴
2. Create a feature branch (`git checkout -b feature/your-feature`). 🌟
3. Commit your changes (`git commit -m 'Add your feature'`). ✅
4. Push to the branch (`git push origin feature/your-feature`). 🚀
5. Open a pull request. 📬

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](https://grok.com/chat/LICENSE) file for details. 📄

## 📬 Contact

Have questions or feedback? Open an issue on [GitHub](https://github.com/moeez5251/Library-Management-System/issues) or reach out to the project maintainers. 📧

---

Happy managing your library! 📚✨

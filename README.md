# 📚 Library Management API

A simple RESTful API built with **Express**, **Mongoose** , **TypeScript**, and **MongoDB** to manage a library's book collection and borrowing system.

## 🚀 Features

- Create, update, delete
- Borrow books with quantity and due date
- Automatically manage book availability
- Aggregated borrow summary per book
- filtering, sorting

---

## 📦 Tech Stack

- Node.js + Express
- TypeScript
- MongoDB (Mongoose)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file (or directly configure) and provide your MongoDB connection string.

Example used:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/database-name?retryWrites=true&w=majority
PORT=8000
```

> ⚠️ MongoDB connection string is currently hardcoded in `src/server.ts`. You can improve this by using `dotenv`.

### 4. Run the Server

```bash
npm run dev
```

---

## 🧪 API Endpoints

### 📘 Book Routes

| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| GET    | `/api/books`        | Get all books (filter, sort)    |
| GET    | `/api/books/:id`    | Get a single book               |
| POST   | `/api/books`        | Create a new book               |
| PUT    | `/api/books/:bookId`| Update a book                   |
| DELETE | `/api/books/:bookId`| Delete a book                   |

**Query Parameters for GET `/api/books`:**

- `filter`: Filter by genre (e.g. FANTASY)
- `sortBy`: Sort field (default: `createdAt`)
- `sort`: `asc` or `desc` (default: `desc`)
- `limit`: Number of books to return (default: `10`)

---

### 📖 Borrow Routes

| Method | Endpoint         | Description                           |
|--------|------------------|---------------------------------------|
| POST   | `/api/borrow`    | Borrow a book                         |
| GET    | `/api/borrow`    | Get borrow summary (grouped by book)  |

#### 📤 Borrow Request Body

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

---

## 📂 Project Structure

```
src/
├── app/
│   ├── controllers/       # Route handlers
│   ├── lib/               # Shared utilities (e.g., error handling)
│   ├── models/            # Mongoose schemas and models
│   └── interfaces/        # TypeScript interfaces
├── server.ts              # App entry point
├── app.ts                 # Express config and route binding
```

---

## ✅ Linting

```bash
npm run lint
```

> ESLint v9+ uses `eslint.config.js`. Make sure it's configured properly.



Made by **Ibrahim Sarkar**
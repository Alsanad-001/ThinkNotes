# 📝 ThinkNotes | AI-Powered MERN Notes Application

A modern full-stack notes application built with the MERN stack. ThinkNotes enables users to create, organize, and manage notes with AI-generated summaries, search functionality, pagination, and a clean, responsive interface.

The project follows a modular Express backend architecture, making it easier to maintain, scale, and extend with additional features.

## 🚀 Tech Stack

### Frontend

* React.js (Vite)
* React Router
* Tailwind CSS
* DaisyUI
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Google Gemini API
* Upstash Redis
* Express Rate Limit

## ✨ Key Features

* 📝 Create, edit, delete, and manage notes.
* 🤖 Generate AI-powered summaries using Google Gemini.
* 🔍 Search notes by keywords.
* 📄 Browse notes with pagination.
* ⚡ Protect APIs with rate limiting powered by Upstash Redis.
* 📱 Responsive UI built with Tailwind CSS and DaisyUI.
* 🏗️ Modular backend architecture using routes, controllers, models, middleware, and configuration files.
* 🔄 RESTful APIs for seamless frontend-backend communication.
* ☁️ Cloud-based data storage with MongoDB Atlas.

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd ThinkNotes
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file and add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
GEMINI_API_KEY=your_gemini_api_key
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

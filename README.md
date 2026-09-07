# 🎯 Gen-AI Interview Coach

**An AI-powered full-stack application that generates personalized interview preparation reports from a candidate's resume and target job description — powered by Google's Gemini API.**

<br>

## 📖 Overview

Gen-AI Interview Coach analyzes a user's resume (or self-description) alongside a target job description, and generates a complete, structured interview preparation strategy — including a match score, technical and behavioral questions, skill-gap analysis, and a 7-day study roadmap.

<br>

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Secure Authentication** | JWT-based auth with HTTP cookies, bcrypt password hashing, and a token-blacklist for real-time logout revocation |
| 📄 **Resume Parsing** | In-memory PDF text extraction (no disk I/O) using Multer + pdf-parse |
| 🤖 **AI-Generated Reports** | Match score, 5+ technical questions, 5+ behavioral questions, skill gaps, and a 7-day prep roadmap — generated via Google Gemini |
| ✅ **Reliable AI Output** | Schema-constrained Gemini responses, independently re-validated at runtime with Zod before being saved |
| 📊 **Interactive Dashboard** | Tabbed React UI to browse questions, roadmap, and skill gaps |
| 📁 **Report History** | View and revisit all previously generated reports |

<br>

## 🛠️ Tech Stack

### Frontend
- **React** (with React Router)
- **Axios**
- **Context API** for state management
- **SCSS**

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** (jsonwebtoken) for authentication
- **bcryptjs** for password hashing
- **Multer** for file uploads
- **pdf-parse** for resume text extraction

### AI & Validation
- **Google Gemini API** (`@google/genai`) for report generation
- **Zod** for runtime schema validation of AI responses

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local instance or MongoDB Atlas)
- A Google Gemini API key

<br>

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/<your-username>/gen-ai-interview-coach.git
cd gen-ai-interview-coach
```

**2. Install backend dependencies**
```bash
cd Backend
npm install
```

**3. Install frontend dependencies**
```bash
cd ../Frontend
npm install
```

**4. Set up environment variables**

Create a `.env` file inside the `Backend/` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

**5. Run the backend**
```bash
cd Backend
node service.js
```
> Server runs on `http://localhost:3000`

**6. Run the frontend**
```bash
cd Frontend
npm run dev
```
> App runs on `http://localhost:5173`


## 📂 Project Structure

```
├── Backend/
│   ├── src/
│   │   ├── config/          # Database connection
│   │   ├── controllers/     # Auth & interview business logic
│   │   ├── middlewares/     # Auth guard, file upload
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express route definitions
│   │   └── services/        # Gemini AI integration
│   └── service.js           # Entry point
│
└── Frontend/
    └── src/
        ├── features/
        │   ├── auth/         # Login, register, auth context & hooks
        │   └── interview/    # Report generation, dashboard, context & hooks
        ├── app.routes.jsx    # Route definitions
        └── App.jsx           # Root component
```

<br>

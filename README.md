# Resume In 📄

An AI-powered resume analyzer that provides instant feedback on your resume using Google Gemini AI. Upload your PDF resume and get a detailed score, skills detection, strengths, weaknesses, suggestions and improvements.

---

## 🚀 Live Demo

- **Frontend:** [resume-in.netlify.app](https://resume-in.netlify.app)
- **Backend:** [resume-in-backend.onrender.com](https://resume-in-backend.onrender.com)

---

## ✨ Features

- 🤖 **AI Analysis** — Deep resume analysis powered by Google Gemini AI
- 📊 **Score out of 100** — Get an overall score with section-wise breakdown
- 🛠️ **Skills Detection** — Automatically detects all technical skills
- ✅ **Strengths & Weaknesses** — Know what's working and what's not
- 💡 **Suggestions** — Actionable tips to improve your resume
- 🚀 **Improvements** — Specific changes to make your resume stand out
- 📁 **Past Analyses** — Track all your past analyses in one place
- 🔐 **Authentication** — Secure JWT-based login and registration
- 📱 **Responsive** — Works on mobile, tablet and desktop

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)

### Deployment
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Atlas-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 📁 Project Structure

```
resume-in-fullstack/
├── frontend/                     # React frontend
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── components/
│       │   ├── Headers.jsx
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Result.jsx
│       │   ├── PastAnalyses.jsx
│       │   ├── ResumeDetail.jsx
│       │   ├── Footer.jsx
│       │   └── NotFound.jsx
│       ├── App.jsx
│       └── main.jsx
│
└── backend/                     # Node.js backend
    ├── middleware/
    │   └── verifyToken.js
    ├── models/
    │   ├── userModel.js
    │   └── resumeModel.js
    ├── routes/
    │   ├── authRoute.js
    │   └── resumeRoute.js
    └── index.js
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Gemini API key

### 1. Clone the repository
```bash
git clone https://github.com/venkatNagamalla/resume-in-fullstack.git
cd resume-in-fullstack
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create `.env` file in `/server`:
```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
PORT=3000
```

Run the backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
npm start
```

## 🤖 How It Works

```
User uploads PDF resume
        ↓
Multer receives and stores file in memory
        ↓
pdf-parse extracts text from PDF
        ↓
Google Gemini AI analyzes the text
        ↓
Returns JSON with score, skills, strengths,
weaknesses, suggestions and improvements
        ↓
Results saved to MongoDB
        ↓
Displayed on the Results page
```

## 🚀 Deployment

### Frontend (Netlify)
```
Base directory:       frontend
Build command:        npm run build
Publish directory:    frontend/build
```

### Backend (Render)
```
Root Directory:     backend
Build Command:      npm install
Start Command:      node index.js
```

---

## 👨‍💻 Author

**Nagamalla Venkat Shiva Durga**
- GitHub: [@venkatNagamalla](https://github.com/venkatNagamalla)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ If you found this project helpful, please give it a star!

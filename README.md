# 📰 SERP News App

A **full-stack tech news application** that fetches the latest tech news from the [SerpAPI](https://serpapi.com/) using a **Flask backend** and displays it in a **React.js frontend** styled with **Tailwind CSS**.  

The app is mobile-responsive 📱 and includes a share feature for easy content sharing across platforms.

---

## 📂 Project Structure

serp_news_app/ <br>
│ <br>
├── backend/                <br>
│   ├── app.py               <br>
│   ├── requirements.txt      <br>
│   └── .env                 <br>
│ <br>
├── frontend/                <br>
│   ├── src/ <br>
│   │   ├── App.jsx           <br>
│   │   ├── components/      <br>
│   │   └── pages/            <br>
│   ├── package.json          <br>
│   └── tailwind.config.js  <br>
│ <br>
└── README.md              <br>



---

## 🛠 Tech Stack

### **Backend**
- 🐍 Python 3.x
- ⚡ Flask
- 🌐 Flask-CORS
- 🔍 SerpAPI

### **Frontend**
- ⚛️ React.js
- 🎨 Tailwind CSS
- 📦 Axios
- 📱 Mobile Responsive UI

---

## 🚀 Features
- 🔎 Fetches latest **tech news** using SerpAPI.
- 🖥 Clean and responsive UI built with Tailwind CSS.
- 📤 Share button to share articles with `URL` and `title`.
- ⚡ Fast API responses via Flask backend.
- 📱 Works seamlessly on desktop and mobile.

---

## 📌 Prerequisites

Before running the project, ensure you have:

- **Python 3.x** installed
- **Node.js & npm** installed
- A valid **SerpAPI key** (Sign up at [SerpAPI](https://serpapi.com/))

---

## ⚙️ Backend Setup (Flask)

```bash
# Navigate to backend
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # For Mac/Linux
venv\Scripts\activate     # For Windows

# Install dependencies
pip install -r requirements.txt

# Create .env file with your SerpAPI key
echo "SERP_API_KEY=your_serp_api_key_here" > .env

# Run the server
python app.py
```

Backend runs by default at http://localhost:4000.

```
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the React app
npm run dev
```

Frontend runs by default at http://localhost:5173 (Vite) 

| Method | Endpoint | Description            |
| ------ | -------- | ---------------------- |
| GET    | `/tool`  | Fetch latest tech news |

```

# 📱 Mobile Responsiveness
Optimized grid layout for mobile, tablet, and desktop.

Touch-friendly UI elements.

Adaptive font sizes for readability.
```

🛡 Environment Variables
# Backend (backend/.env)
ini
Copy
Edit
SERP_API_KEY=your_serp_api_key_here

## 🏗 Build for Production
# Frontend
bash
Copy
Edit
cd frontend
npm run build

Backend Deploy using any Python hosting platform (Render, Railway, Heroku, etc.).

```

# 🤝 Contributing
Pull requests are welcome!
If you find a bug or want to suggest improvements, please open an issue first.

```

# 📜 License
This project is licensed under the MIT License.



# 👨‍💻 Author
[Yugesh Karan](https://github.com/YUGESHKARAN)

```























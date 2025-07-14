# 🔗 URL Shortener Web Application

A fully functional, responsive **React-based URL Shortener** web app that allows users to shorten URLs, generate custom shortcodes, manage expiry times, and view click analytics — all with robust client-side logic and error handling.

## 🚀 Features

- ✂️ Shorten up to **5 URLs at once**
- ⏱️ Set custom **expiry time** (defaults to 30 minutes)
- 🔤 Add **custom shortcode** (must be unique & valid)
- 🔁 Redirects short URLs to long URLs using **React Router**
- 📊 View detailed **click statistics**
  - Total clicks
  - Timestamp, location, and referrer of each click
- 🔐 Uses **custom logging middleware** (no console.log)
- 💅 Built with **Material UI**

---

## 🧱 Tech Stack

- **React** (v18+)
- **React Router v6**
- **Material UI**
- **UUID for unique shortcode generation**
- **Browser localStorage** for client-side persistence
- **Custom logging middleware** (mandatory requirement)

---

## 📂 Project Structure

url-shortener-app/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ ├── context/
│ ├── pages/
│ ├── utils/
│ ├── logger/
│ ├── App.js
│ ├── index.js
├── package.json
└── README.md

---

## 🧪 How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start

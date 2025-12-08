# 🏡 Nestora Real Estate – Full Stack MERN Application

Nestora Real Estate is a full-stack MERN web application that allows users to browse, search, filter, create, update, and manage property listings. The platform includes secure authentication, smooth UI experience, image uploads with Cloudinary, and real-time notifications.

It’s designed as a complete end-to-end real estate platform.

---

## 🚀 Live Demo

🔗 Live Link: [https://mern-real-estate-ax8b.onrender.com]  
📂 GitHub Repository: [https://github.com/Abhay-Pratap200001/Real-state-clone]

---

## ✨ Key Features

### 🔐 Secure Authentication
- User Signup & Login
- JWT-based authentication
- Protected routes
- Profile update
- Account delete

### 🏘️ Property Listing Management (CRUD)
- Add new property
- Update property details
- Delete property
- Multiple image upload via Cloudinary

### 🔎 Advanced Search & Filters
- Rent / Sale
- Furnished / Unfurnished
- Category filtering
- Custom price range
- Keyword-based search

### 🏠 Home Page Sections
- Recent listings
- Offers
- Rentals
- Sale properties

### 🔔 Real-Time Feedback
- Success & error alerts using **React Hot Toast**

### 🎨 Smooth UI & UX
- **Lenis** – smooth scrolling
- **Swiper** – image sliders
- Mobile-first responsive design

---

## 🛠️ Tech Stack

### 🔷 Frontend
- React.js
- Redux Toolkit
- React Hot Toast
- Swiper
- Lenis (Smooth Scrolling)
- Tailwind CSS / Modern CSS
- Firebase (for additional services if required)

### 🔷 Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Cloudinary (Image Uploads)
- JWT Authentication

---

## 📁 Actual Project Structure

Nestora-Real-Estate
│
├── api/ (Backend Folder)
│ ├── config/
│ │ ├── cloudinary.js
│ │ └── db_connection.js
│ │
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ ├── listing.controller.js
│ │ └── user.controller.js
│ │
│ ├── middleware/
│ │ └── error.middleware.js
│ │
│ ├── models/
│ │ ├── listing.model.js
│ │ └── user.model.js
│ │
│ ├── routes/
│ │ ├── auth.routes.js
│ │ ├── listing.routes.js
│ │ ├── user.routes.js
│ │ └── index.js
│ │
│ ├── index.js
│ └── node_modules/
│
├── client/ (Frontend Folder)
│ ├── src/
│ │ ├── Animation/
│ │ │ └── smoothscroll.jsx
│ │
│ │ ├── components/
│ │ │ ├── Contact.jsx
│ │ │ ├── Header.jsx
│ │ │ ├── ListingItems.jsx
│ │ │ ├── OAuth.jsx
│ │ │ └── PrivateRoute.jsx
│ │
│ │ ├── pages/
│ │ │ ├── About.jsx
│ │ │ ├── CreateListing.jsx
│ │ │ ├── Home.jsx
│ │ │ ├── Listing.jsx
│ │ │ ├── Profile.jsx
│ │ │ ├── Search.jsx
│ │ │ ├── SignIn.jsx
│ │ │ ├── SignUp.jsx
│ │ │ └── UpdateListing.jsx
│ │
│ │ ├── redux/
│ │ │ ├── user/
│ │ │ │ └── userSlice.js
│ │ │ └── store.js
│ │
│ │ ├── App.jsx
│ │ ├── firebase.js
│ │ └── index.css
│ │
│ ├── index.html
│ ├── package.json
│ ├── postcss.config.js
│ └── tailwind.config.js
│
├── .env
├── .gitignore
├── package.json
├── README.md
└── vite.config.js

yaml
Copy code

---

## ⚙️ How To Run The Project
npm run dev 

### 1. Clone the repository

``bash
git clone https://github.com/Abhay-Pratap200001/Real-state-clone.git
cd nestora-real-estate

2. Install dependencies
For Backend
bash
Copy code
cd api
npm install
For Frontend
bash
Copy code
cd client
npm install
3. Add Environment Variables
Create a .env file in the api folder and add:

env
Copy code
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key

CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
CLOUDINARY_CLOUD_NAME=xxxx
4. Start the project
Start Backend
bash
Copy code
cd api
npm start
Start Frontend
bash
Copy code
cd client
npm run dev
Now open:

Frontend → http://localhost:5173

Backend → http://localhost:7000

📸 Screenshots folder named 

Pages/Home.jsx
<img width="1899" height="789" alt="image" src="https://github.com/user-attachments/assets/c6776e42-dd4f-48fb-a094-d71d718cd9be" />


Pages/About.jsx
<img width="936" height="928" alt="image" src="https://github.com/user-attachments/assets/bd0fbf8f-a93d-43b9-ac41-75846f439442" />


Pages/SigIn.jsx
<img width="958" height="929" alt="image" src="https://github.com/user-attachments/assets/a36751f8-5461-4704-93c4-7096081f693b" />


Pages/SigUp.jsx
<img width="957" height="931" alt="image" src="https://github.com/user-attachments/assets/fb5f86cd-1280-42ab-84eb-ef6325041461" />


Pages/CreateListing.jsx
<img width="956" height="928" alt="image" src="https://github.com/user-attachments/assets/44681ea0-4015-47ce-bc39-87854e590a97" />


Pages/UpdateListin.jsx
<img width="957" height="929" alt="image" src="https://github.com/user-attachments/assets/2501505b-0fe4-497f-8aab-ce7aa74d5e73" />


Pages/Search.jsx
<img width="934" height="900" alt="image" src="https://github.com/user-attachments/assets/3d96574b-6030-410e-b045-9da106b4d4a3" />


Pages/Listing
<img width="941" height="929" alt="image" src="https://github.com/user-attachments/assets/d3e3a314-41a7-4acd-8356-301ba029169d" />

👨‍💻 Developer
Abhay Verma
MERN Stack Developer

🌟 Support
If you like this project, don’t forget to star ⭐ the repo and share it!


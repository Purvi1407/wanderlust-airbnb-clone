# 🌍 WanderLust

> A full-stack travel and accommodation platform inspired by Airbnb — explore, list, and review unique stays across the world.


🔗 **Live App:** [https://wanderlust-airbnb-clone-i2ig.onrender.com](https://wanderlust-airbnb-clone-i2ig.onrender.com)

---

## ✨ Features

- 🏠 **Browse Listings** — Explore travel stays with photos, descriptions, pricing, and map locations
- ➕ **Create & Manage Listings** — Authenticated users can add, edit, and delete their own properties
- ⭐ **Reviews & Ratings** — Leave reviews on listings and read what other travelers think
- 🔐 **User Authentication** — Secure sign up, log in, and session management via Passport.js
- 🗺️ **Interactive Maps** — Mapbox integration to visualize listing locations
- 🖼️ **Image Uploads** — Cloud-based image storage via Cloudinary and Multer
- ✅ **Form Validation** — Server-side validation using Joi with helpful error messages
- 🔔 **Flash Messages** — Real-time success and error feedback throughout the app

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 22 |
| Framework | Express 5 |
| Database | MongoDB + Mongoose |
| Templating | EJS + EJS-Mate |
| Authentication | Passport.js (Local Strategy) |
| Image Storage | Cloudinary + Multer |
| Maps | Mapbox SDK |
| Session Store | connect-mongo |
| Validation | Joi |
| Deployment | Render |

---
## 📁 Project Structure

```
wanderlust-airbnb-clone/
├── controllers/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── init/
│   ├── data.js             # Seed data
│   └── index.js            # DB seeding script
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── public/
│   ├── css/
│   │   ├── rating.css
│   │   └── style.css
│   └── js/
│       ├── map.js
│       └── script.js
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── utils/
│   ├── expressError.js     # Custom error class
│   └── wrapAsync.js        # Async error wrapper
├── views/
│   ├── includes/
│   │   ├── flash.ejs
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   ├── layout/
│   │   └── boilerplate.ejs
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   ├── new.ejs
│   │   └── edit.ejs
│   ├── users/
│   │   ├── login.ejs
│   │   └── signup.ejs
│   └── error.ejs
├── .gitignore
├── app.js
├── cloud-config.js
├── middleware.js
├── package.json
└── schema.js
```

---


## 🚀 Run Locally

If you'd like to run this project on your own machine:

1. **Clone the repository**

```bash
   git clone https://github.com/Purvi1407/wanderlust-airbnb-clone.git
   cd wanderlust-airbnb-clone
```

2. **Install dependencies**

```bash
   npm install
```

3. **Create a `.env` file** in the root directory with your own credentials:

```env
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SECRET=your_session_secret_key

   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret

   MAP_TOKEN=your_mapbox_access_token
```

4. **(Optional) Seed the database**

```bash
   node init/index.js
```

5. **Start the server**

```bash
   node app.js
```

6. Visit `http://localhost:8080`

---

## 📸 Screenshots

<img width="1913" height="997" alt="image" src="https://github.com/user-attachments/assets/c3c4add1-c534-4a38-83bb-0fe6116af599" />



---

## 🔮 Future Improvements

-  Search and filter listings by location, price, or category
-  Booking and reservation system
-  User profile pages
-  Wishlist / saved listings


---

## 🙋‍♀️ Author

**Purvi** — [GitHub](https://github.com/Purvi1407)

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

# Movie Discovery App

A full-stack movie discovery application built with React, Node.js, Express, MongoDB, and the TMDB API.

The application allows users to discover movies, search by title, filter and sort results, view detailed movie information, and maintain a persistent wishlist.

---

## Features

- Browse popular movies
- Search movies by title
- Filter movies by:
  - Genre
  - Release year
  - Minimum rating
- Sort movies by:
  - Popularity
  - Rating
  - Release date
  - Title
- Paginated movie discovery and search results
- Movie details page
- Add/remove movies from wishlist
- Persistent wishlist using MongoDB
- Anonymous browser/device-based wishlist
- Backend API abstraction over TMDB
- Server-side response normalization
- In-memory caching for repeated requests
- Request cancellation for changing movie queries
- API rate limiting
- Request validation using Zod
- Secure HTTP headers using Helmet
- Centralized error handling
- Responsive design for desktop, tablet, and mobile
- TMDB attribution

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- TanStack Query
- Axios
- CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Zod
- Helmet
- express-rate-limit
- dotenv

### External API

- TMDB API

---

## Project Structure

```text
movie-discovery-app/
│
├── client/
│   ├── public/
│   │   └── tmdb-logo.svg
│   │
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.js
│   │   │   ├── movies.js
│   │   │   └── wishlist.js
│   │   │
│   │   ├── components/
│   │   │   ├── MovieCard.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useMovies.js
│   │   │   └── useWishlist.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── MovieDetails.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   └── Credits.jsx
│   │   │
│   │   ├── utils/
│   │   │   └── deviceId.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── movie.controller.js
│   │   │   └── wishlist.controller.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   ├── movie.validation.js
│   │   │   ├── rateLimiter.js
│   │   │   ├── validate.js
│   │   │   └── wishlist.validation.js
│   │   │
│   │   ├── models/
│   │   │   └── wishlist.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── movie.routes.js
│   │   │   └── wishlist.routes.js
│   │   │
│   │   ├── services/
│   │   │   ├── movie.service.js
│   │   │   └── tmdb.client.js
│   │   │
│   │   ├── utils/
│   │   │   ├── cache.js
│   │   │   └── movie.utils.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
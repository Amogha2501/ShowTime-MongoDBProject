# Movie Database Mongo Assignment

A full-stack movie booking application built with Express, MongoDB, and React. The app supports movie browsing, show selection, seat booking, user authentication, and booking history.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Workflow](#workflow)
- [Technologies](#technologies)
- [Repository Structure](#repository-structure)
- [Backend Details](#backend-details)
- [Frontend Details](#frontend-details)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Authentication Flow](#authentication-flow)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)

## Project Overview

This repository contains two main applications:

- `backend/`: A Node.js + Express API server connected to MongoDB with models and routes for movies, theaters, shows, bookings, and user accounts.
- `frontend/`: A React app that lets users browse movies, view details, choose showtimes, select seats, book tickets, and view booking history.

## Features

- Browse movies and view posters, titles, ratings, and genres.
- View detailed movie pages and showtime listings.
- Select seats and complete bookings for a selected show.
- Sign up, log in, and store authentication token locally.
- View bookings in the user profile.
- Persist booked seats in the backend so duplicates cannot be reserved.

## Workflow

The application follows a straightforward user journey for movie ticket booking:

1. **Browse Movies**: Users start at the home page, where they can browse a list of available movies with posters, titles, and basic details. Search functionality allows filtering by movie title or genre.

2. **View Movie Details**: Clicking on a movie card navigates to the movie details page, displaying comprehensive information including plot, cast, runtime, and IMDb ratings.

3. **Select Showtime**: From the movie details page, users can proceed to view available showtimes for that movie. Each show lists the theater, start time, screen number, and price.

4. **Choose Seats**: Selecting a showtime leads to the booking page, where users can interactively select available seats from a visual seat map. The system prevents selection of already booked seats.

5. **Complete Booking**: After selecting seats, users confirm the booking, which calculates the total amount and processes the reservation. Authentication is required for this step.

6. **View Bookings**: Logged-in users can access their profile to view a history of all bookings, including movie details, show times, selected seats, and payment amounts.

7. **Authentication**: Users must sign up or log in to access booking and profile features. Authentication tokens are stored locally for session management.

## Technologies

- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, dotenv, CORS
- Frontend: React, React Router v7, Axios, React Scripts

## Repository Structure

- `backend/`
  - `server.js` - Express application entrypoint and MongoDB connection
  - `models/` - Mongoose schemas for:
    - `Movie.js`
    - `Show.js`
    - `Theater.js`
    - `Booking.js`
    - `User.js`
  - `routes/` - Express route modules for:
    - `authRoutes.js` - sign-up and login
    - `movieRoutes.js` - movie listing and details
    - `showRoutes.js` - show listing, filtering, details, and creation
    - `theaterRoutes.js` - theater listing
    - `bookingRoutes.js` - create booking and fetch user bookings
- `frontend/`
  - `src/App.js` - React router and page mappings
  - `src/index.js` - app bootstrap
  - `src/components/` - reusable UI components such as `Navbar`, `MovieCard`, `ShowCard`, and `SeatSelector`
  - `src/pages/` - main app pages:
    - `Home.js`
    - `MovieDetails.js`
    - `ShowSelection.js`
    - `BookingPage.js`
    - `Profile.js`
    - `Login.js`
    - `Signup.js`
  - `src/services/api.js` - Axios client configured for backend requests

## Backend Details

### Models

- `Movie`: title, year, plot, poster, genres, runtime, cast, and IMDb rating/votes.
- `Show`: movie reference, theater reference, start time, screen number, price, total seats, and booked seats.
- `Theater`: theater identifier and location details.
- `Booking`: show reference, user ID, seat numbers, total amount, and booking date.
- `User`: username, email, and hashed password.

### Routes

- `POST /api/auth/signup` - create account and return a JWT token.
- `POST /api/auth/login` - authenticate and return a JWT token.
- `GET /api/movies` - get available movies.
- `GET /api/movies/:id` - get details for a single movie.
- `GET /api/shows` - get all shows.
- `GET /api/shows/movie/:movieId` - get shows for a specific movie.
- `GET /api/shows/:id` - get show details including movie and theater info.
- `POST /api/shows/add` - add a new show.
- `GET /api/theaters` - get theaters.
- `POST /api/bookings/create` - create a booking and update show booked seats.
- `GET /api/bookings/user/:userId` - get bookings for a given user.

### Behavior

- Bookings validate that seats are not already reserved.
- Booking insertion updates the show’s `bookedSeats` array.
- User accounts are stored with hashed passwords using `bcryptjs`.
- JWT tokens are signed with `JWT_SECRET` from `.env` or a fallback secret.

## Frontend Details

### Key Features

- **Movie Browsing**: Grid layout of movie cards with posters, titles, and ratings. Supports search by title or genre.
- **Movie Details**: Comprehensive movie information including plot summary, cast list, runtime, genres, and IMDb ratings.
- **Showtime Selection**: List of available shows for a movie, showing theater name, time, screen, and price.
- **Interactive Seat Selection**: Visual seat map allowing users to select and deselect seats, with real-time availability and price calculation.
- **User Authentication**: Secure login and signup forms with form validation and error handling.
- **Booking History**: Profile page displaying past bookings with movie posters, show details, selected seats, and amounts.
- **Responsive Design**: Mobile-friendly layout using CSS for various screen sizes.
- **Navigation**: Intuitive navbar with conditional rendering based on authentication status.

### Pages

- `Home`: Displays a grid of movie cards fetched from the API. Includes a search bar for filtering movies by title or genre. Handles loading and error states gracefully.
- `MovieDetails`: Shows detailed information about a selected movie, including poster, title, year, plot, cast, runtime, and genres. Includes a "Book Tickets" button that navigates to show selection.
- `ShowSelection`: Lists all available shows for a specific movie, populated with theater and timing details. Each show card links to the booking page.
- `BookingPage`: Provides an interactive seat selector component. Displays show details, selected seats, total price, and a "Pay Now" button. Requires user authentication.
- `Profile`: Accessible only to logged-in users, shows user info and a list of their bookings with movie details and booking information.
- `Login`: Form for user login with email and password fields, including error messages and navigation to signup.
- `Signup`: Registration form with username, email, and password fields, with validation and success redirection.
- `Not Found`: Implicit handling for invalid routes via React Router.

### Components

- `Navbar`: Top navigation bar with links to Home, Profile (if logged in), Login/Signup (if not logged in). Uses React Router for navigation and localStorage for auth state.
- `MovieCard`: Reusable card component displaying movie poster, title, and rating. Clickable to navigate to movie details.
- `ShowCard`: Displays show information including theater, time, screen, and price. Includes a "Book Now" button linking to booking.
- `SeatSelector`: Interactive grid representing theater seats. Shows available, selected, and booked seats. Updates selected seats state and calculates total.
- `Banner`: Hero section on the home page with a welcome message and call-to-action.

### API Integration

- `frontend/src/services/api.js` sets `API_BASE_URL` to `http://localhost:5000/api`.
- The frontend uses Axios to fetch movies, shows, movie/show details, create bookings, and user bookings.
- Authentication uses `localStorage` to persist `token` and `user` data.
- Error handling for API calls includes user-friendly messages and loading indicators.

## Prerequisites

- Node.js v16 or later
- npm (or yarn)
- MongoDB connection (local or Atlas)

## Setup

### Backend

```bash
cd backend
npm install
```

Create `backend/.env` with:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Open the frontend at `http://localhost:3000`.

## Environment Variables

In `backend/.env`:

- `MONGO_URI` – MongoDB connection string.
- `PORT` – optional Express port (defaults to `5000`).
- `JWT_SECRET` – JWT signing secret.

If `PORT` changes, also update `API_BASE_URL` in `frontend/src/services/api.js`.

## Usage

1. Start backend and frontend.
2. Create an account or log in.
3. Browse movies from the home page.
4. View a movie detail page.
5. Select a showtime and proceed to seat selection.
6. Complete a booking and view it on your profile.

## Authentication Flow

- Users sign up via `POST /api/auth/signup`.
- Users log in via `POST /api/auth/login`.
- Successful authentication returns a JWT and user info.
- The frontend stores token/user in `localStorage` and protects booking/profile flows.

## API Endpoints

The frontend expects backend endpoints under `/api`.

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/movies`
- `GET /api/movies/:id`
- `GET /api/shows`
- `GET /api/shows/movie/:movieId`
- `GET /api/shows/:id`
- `POST /api/shows/add`
- `GET /api/theaters`
- `POST /api/bookings/create`
- `GET /api/bookings/user/:userId`

## Troubleshooting

- Backend startup error: check `backend/.env` and `MONGO_URI`.
- Frontend cannot fetch API: ensure backend is running and `API_BASE_URL` matches.
- Authentication failure: clear `localStorage` and log in again.
- Booking error for duplicate seats: refresh the show page and select open seats.

## Future Improvements

- Add server-side JWT verification middleware.
- Enable booking cancellation and seat release.
- Add admin pages for movie/show/theater management.
- Improve UI and responsive mobile design.
- Add validation and error handling on the backend for all routes.

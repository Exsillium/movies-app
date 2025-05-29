# 🎬 Movies App

A feature-rich React-based web application for browsing movies and TV shows, managing a personal wishlist, and exploring detailed information, all powered by The Movie Database (TMDB) API.

## ✨ Features Implemented

- **TMDB API Integration:** Seamlessly fetches and displays data from The Movie Database.
- **User Authentication:**
  - Secure login/logout functionality using TMDB's authentication flow.
  - Session management with Redux and `localStorage`.
  - Personalized user account dropdown displaying avatar, username, and other details (ID, country, language).
- **Movie & TV Show Discovery:**
  - **Home Page:** (Currently a placeholder, ready for featured content).
  - **Movies Page:** (Route exists, page to be implemented for movie listings).
  - **TV Shows Page:** Displays categorized TV shows (Popular, Top Rated, Currently Airing) with sliders.
  - **Category Pages:** Dedicated pages for "Popular," "Top Rated," and "Airing" TV shows with pagination.
  - **Detailed Views:**
    - Comprehensive movie and TV show details pages.
    - **Hero Section:** Backdrop, poster, title, rating, year, status, overview, genres.
    - **Show Information:** (For TV shows) Seasons, episodes, runtime, type, language, popularity.
    - **Cast List:** Displays featured cast members.
    - **Air Dates & Production:** (For TV shows) First/last air dates, production companies with logos.
    - **Recommended Movies/Similar Shows:** Sliders for related content.
  - **Quick View Modal:** Click on a TV show/movie card to open a modal with detailed information without leaving the current page.
- **Wishlist Functionality:**
  - Add or remove movies/shows to a personal wishlist.
  - Wishlist data persisted using Redux and `localStorage`.
  - Dedicated Wishlist page to view and manage saved items.
- **Search:**
  - Navbar search input (currently logs to console, `SearchResultsPage` is a placeholder).
- **Routing & Navigation:**
  - Client-side routing with `react-router-dom`.
  - Lazy loading for page components for optimized performance.
  - User-friendly Navbar with dynamic links.
- **State Management:**
  - Centralized state management with Redux Toolkit.
- **UI & UX:**
  - Responsive design using Bootstrap.
  - Loading and error states for a better user experience.
  - Custom styling for a polished look.
- **Data Fetching:**
  - Efficient data fetching, caching, and revalidation using SWR.

## 🛠️ Tech Stack

- **Frontend:** React, JavaScript (ES6+)
- **Routing:** React Router DOM
- **State Management:** Redux Toolkit
- **Data Fetching:** SWR, Axios
- **Styling:** Bootstrap 5, CSS3
- **Icons:** React Icons
- **Build Tool:** Vite

## 📂 Project Structure

```
src/
├── apis/               # Axios instances for API calls (tmdbApi)
├── assets/             # Static assets (images, svgs)
├── components/         # Reusable UI components
│   ├── account/        # Authentication related (LoginButton, LogoutButton)
│   ├── details/        # Components for detail pages (HeroSection, CastList)
│   ├── layout/         # Structural components (Navbar, Footer)
│   ├── movies/         # Movie-specific components (MovieCard, RecommendedMovies)
│   └── tvshows/        # TV show-specific components (TvShowCard, ShowsSlider)
├── hooks/              # Custom React hooks
│   └── swr/            # SWR-based data fetching hooks
├── pages/              # Top-level page components
├── store/              # Redux store configuration and slices
│   └── slice/          # Redux slices (sessionId, wishlist)
├── styles/             # Global and component-specific styles
├── App.jsx             # Main application component with routing
├── main.jsx            # Application entry point
└── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn
- A TMDB API Key and Access Token

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd movies-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your TMDB API Access Token:

    ```env
    VITE_MOVIE_ACCESS_KEY=your_tmdb_api_access_token_here
    ```

    _Note: The `VITE_` prefix is important for Vite projects to expose environment variables to the client-side code.\_

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application should now be running on `http://localhost:5173` (or another port if 5173 is in use).

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Lints the project files.
- `npm run preview`: Serves the production build locally.

## 🔮 Future Enhancements / To-Do

- **Full Search Implementation:** Connect the search input to `SearchResultsPage` to display actual search results.
- **Movies Page:** Implement a dedicated page for browsing and filtering movies (similar to the TV Shows page).
- **Complete Placeholder Components:**
  - `Footer.jsx`
  - `MovieInfo.jsx` (if distinct movie-specific info is needed beyond `ShowInfo.jsx`)
  - `LanguageSelector.jsx`
  - `ReviewList.jsx`
  - `Tabs.jsx` (for organizing content on detail pages, e.g., Cast, Reviews, Similar)
- **User Profile Page:** A dedicated page for users to view/edit their TMDB profile information.
- **Filtering and Sorting:** Add options to filter and sort movies/TV shows on listing pages.
- **Error Handling:** More granular error handling and user feedback.
- **Testing:** Implement unit and integration tests.
- **Deployment:** Set up CI/CD for easy deployment.

## 🙏 Acknowledgements

- This project uses TMDb API but is not endorsed or certified by TMDb.
- React Bootstrap for UI components.
- SWR for data fetching.
- Redux Toolkit for state management.

---

This README provides a comprehensive overview of the Movies App project.

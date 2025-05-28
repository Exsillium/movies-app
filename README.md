# Movie & TV Show Browser Application (React)

## 1. Project Overview

A web application built with React, allowing users to browse movies and TV shows, view details, manage a personal wishlist, search for content, and switch languages.

## 2. Project Structure (React)

Below is a suggested project structure for a React application:

```
movies-app/
├── public/
│   ├── index.html                      # Main HTML template
│   └── ...                             # Other static assets (favicons, manifest.json)
├── src/
│   ├── components/                     # Reusable UI components (presentational/dumb)
│   │   ├── Navbar/
│   │   │   └── Navbar.jsx
│   │   │   └── Navbar.module.css
│   │   ├── Footer/
│   │   ├── MovieCard/
│   │   ├── TvShowCard/
│   │   ├── Pagination/
│   │   ├── LoadingSpinner/
│   │   ├── ErrorMessage/
│   │   └── LanguageSelector/
│   ├── pages/                          # Route-level components (containers/smart)
│   │   ├── HomePage.jsx
│   │   ├── MovieDetailsPage.jsx
│   │   ├── TvShowsPage.jsx
│   │   ├── TvShowDetailsPage.jsx
│   │   ├── WishlistPage.jsx
│   │   ├── SearchResultsPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── services/                       # API call logic, utility functions
│   │   └── tmdbApi.js                  # Handles all TheMovieDB API interactions (e.g., using Axios)
│   ├── store/                          # State management (e.g., Redux Toolkit, Zustand, Context API)
│   │   ├── slices/                     # For Redux Toolkit: e.g., wishlistSlice.js, languageSlice.js
│   │   └── store.js                    # Redux store configuration
│   ├── contexts/                       # React Context API (if preferred over global state manager for some features)
│   │   ├── WishlistContext.js
│   │   └── LanguageContext.js
│   ├── hooks/                          # Custom React hooks
│   │   ├── useTmdbApi.js
│   │   └── useLocalStorage.js
│   ├── routes/                         # Routing configuration
│   │   └── AppRouter.jsx               # Defines application routes using React Router
│   ├── assets/                         # Static assets imported by components (images, fonts)
│   │   └── i18n/                       # (Optional) For storing translation files if using i18next
│   ├── App.jsx                         # Main application component (layout, routing setup)
│   ├── App.css                         # Global styles for App component or general layout
│   ├── index.jsx                       # Entry point of the React application
│   └── index.css                       # Global styles, resets
├── .env                                # Environment variables (e.g., REACT_APP_API_KEY)
├── .gitignore
├── package.json                        # Project dependencies and scripts
└── README.md                           # This file
```

## 3. Detailed Features

### 3.1. Core Application

- **React Setup**: Initialize a React application (e.g., using Create React App or Vite).
- **Layout**:
  - **Navbar Component**: Consistent navigation bar across all pages.
    - Links: Home (Movies), TV Shows, Wishlist (using `react-router-dom` `Link` or `NavLink`).
    - Wishlist counter.
    - Language dropdown.
    - Search bar/icon.
  - **Footer Component**: Consistent footer.
  - **Content Area**: Main area for displaying page content, managed by React Router.

### 3.2. Pages and Routing (using `react-router-dom`)

- **Movies List Page (`HomePage.jsx`)**
  - **Route**: `/` or `/movies`
  - **Content**: Displays a list of currently playing movies.
  - **API**: `https://api.themoviedb.org/3/movie/now_playing?api_key={apiKey}&language={language}&page={pageNumber}`
  - **Display**: Movies shown as cards (e.g., `MovieCard` component).
  - **Pagination**: Users can navigate through pages of movie results.
- **Movie Details Page (`MovieDetailsPage.jsx`)**
  - **Route**: `/movie/:id`
  - **Content**: Displays detailed information about a specific movie.
  - **API (Details)**: `https://api.themoviedb.org/3/movie/{id}?api_key={apiKey}&language={language}`
  - **API (Recommendations)**: `https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key={apiKey}&language={language}`
  - **API (Reviews)**: `https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key={apiKey}&language={language}`
  - **Features**:
    - Movie poster, title, overview, release date, rating, etc.
    - Section for recommended movies.
    - Section for user reviews.
    - Wishlist toggle button (heart icon).
- **TV Shows Page (`TvShowsPage.jsx`)**
  - **Route**: `/tv-shows`
  - **Content**: Displays a list of popular TV shows.
  - **API**: `https://api.themoviedb.org/3/tv/popular?api_key={apiKey}&language={language}&page={pageNumber}`
  - **Display**: TV shows shown as cards (e.g., `TvShowCard` component).
  - **Navigation**: Accessible via a "TV Shows" tab/link in the navbar.
  - **Pagination**: Users can navigate through pages of TV show results.
- **TV Show Details Page (`TvShowDetailsPage.jsx`)**
  - **Route**: `/tv/:id` (or `/tv-show/:id`)
  - **Content**: Displays detailed information about a specific TV show.
  - **API**: `https://api.themoviedb.org/3/tv/{series_id}?api_key={apiKey}&language={language}`
  - **Features**:
    - TV show poster, title, overview, first air date, rating, seasons, episodes, etc.
    - Wishlist toggle button (heart icon) - [Bonus].
- **Movies Wishlist Page (`WishlistPage.jsx`)**
  - **Route**: `/wishlist`
  - **Content**: Displays all movies and TV shows added to the user's wishlist.
  - **Features**:
    - Accessible via a "Wishlist" link in the navbar.
    - Each item in the wishlist should be clearly identifiable as a movie or TV show [Bonus].
    - Users can remove items from the wishlist directly on this page.
- **Movies Search Results Page (`SearchResultsPage.jsx`)**
  - **Route**: `/search/:query` (or `/search?query={MovieName}` using `useSearchParams` hook)
  - **Content**: Displays movie search results based on the user's query.
  - **API**: `https://api.themoviedb.org/3/search/movie?api_key={apiKey}&query={MovieName}&language={language}&page={pageNumber}`
  - **Features**:
    - Users are redirected to this page after submitting a search (using `useNavigate` from `react-router-dom`).
    - Search results displayed as movie cards.
    - Pagination for search results.
- **Not Found Page (`NotFoundPage.jsx`)**
  - **Route**: `*` (wildcard route)
  - **Content**: A user-friendly page indicating that the requested URL was not found.

### 3.3. Core Features

- **API Interaction (`services/tmdbApi.js`)**:
  - Centralized module/functions (e.g., using Axios or Fetch API) to handle all API calls to TheMovieDB.
  - Functions for fetching:
    - Now playing movies.
    - Movie details.
    - Movie recommendations.
    - Movie reviews.
    - Popular TV shows.
    - TV show details.
    - Searching movies.
  - The API key should be managed securely (e.g., via `.env` file and `process.env.REACT_APP_API_KEY`) and added to requests. An Axios instance can be configured to include it automatically.
- **Wishlist Functionality (State Management: Redux Toolkit / Zustand / Context API)**:
  - **Add/Remove**:
    - Users can add/remove movies (and TV shows [Bonus]) to their wishlist.
    - This action is typically triggered by clicking a heart icon on a movie/TV show card or details page, dispatching an action or calling a context function.
  - **Visual Feedback**:
    - The heart icon should change its appearance (e.g., filled vs. outline) to indicate if an item is in the wishlist. The filled color should be the main website color.
  - **Navbar Counter**:
    - A counter in the navbar should display the number of items in the wishlist, sourced from the global state.
    - This counter should update dynamically when items are added or removed.
  - **Persistence**:
    - The wishlist should persist across browser sessions (e.g., using `localStorage` and syncing with the state management solution).
  - **Wishlist Page Display**:
    - The `/wishlist` page will read from the global state (or context) to display all items.
    - [Bonus] Clearly distinguish between movies and TV shows on the wishlist page.
- **Pagination**:
  - Implemented on Movies List, TV Shows List, and Search Results pages.
  - API calls will include the `page` query parameter.
  - A reusable `Pagination` component should be created.
- **Search**:
  - A search input field (likely in the `Navbar` component).
  - Submitting a search query navigates the user to the `SearchResultsPage`.
- **Language Switching (State Management: Redux Toolkit / Zustand / Context API)**:
  - **Dropdown**: A `LanguageSelector` component in the Navbar with options: English (`en`), Arabic (`ar`), French (`fr`), Chinese (`zh`).
  - **API Parameter**: When a language is selected, the global language state is updated. API calls should then use this state to include the `language={selected_language_code}` query parameter.
  - **Content Direction**:
    - If Arabic (`ar`) is selected, the website's content direction should change from LTR (Left-to-Right) to RTL (Right-to-Left). This can be managed by dynamically setting the `dir` attribute on the `<html>` or `<body>` tag, or by applying a global CSS class based on the selected language state.
  - **Persistence**: Selected language should persist across sessions (e.g., `localStorage` and syncing with the state management solution).

### 3.4. User Interface & Experience

- **Responsive Design**: The application should be responsive and work well on various screen sizes (desktop, tablet, mobile). This can be achieved with CSS (Flexbox, Grid, media queries) or UI libraries like Bootstrap or Material-UI.
- **Loading States**: Display loading indicators (e.g., `LoadingSpinner` component) while data is being fetched (managed via component state or global state).
- **Error Handling**:
  - Display user-friendly error messages (e.g., `ErrorMessage` component) if API calls fail or data cannot be loaded.
  - Handle cases like invalid movie/TV show IDs.
- **Visual Consistency**: Maintain a consistent design language throughout the application.

### 3.5. [Bonus] Features

- **TV Shows in Wishlist**:
  - Allow users to add TV shows to the wishlist, similar to movies.
  - The wishlist page should clearly differentiate between movie entries and TV show entries (e.g., by storing a `type: 'movie' | 'tv'` property with each wishlist item).

## 4. Technical Considerations

- **API Key**: The TheMovieDB API key (`apiKey`) must be obtained and managed securely. Store it in an `.env` file (e.g., `REACT_APP_API_KEY`) and access it via `process.env`.
- **State Management**: Choose a state management solution appropriate for the application's complexity (React Context API for simpler needs, Redux Toolkit or Zustand for more complex global state).
- **Component-Based Architecture**: Leverage React's component model for building a modular and maintainable UI.
- **Styling**: Choose a styling approach (e.g., CSS Modules, Styled Components, Tailwind CSS, global CSS with BEM).
- **Code Splitting/Lazy Loading**: Use `React.lazy` and `Suspense` for route-based code splitting to improve initial load times.

This README provides an overview of the React application, its structure, and a detailed breakdown of its features.

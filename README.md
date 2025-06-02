# Project `src` Directory Overview

The `src` directory is the heart of the Movies App, containing all the client-side React code, styles, assets, and logic. It's structured to promote modularity and maintainability.

## Core Features:

1.  **Movie & TV Show Discovery:**

    - **Homepage:** Features a dynamic hero slider for popular movies, sections for trending movies, trending TV shows, and upcoming movies.
    - **Dedicated Pages:** Separate pages for browsing all movies and all TV shows, categorized by popularity, ratings, and current status (now playing/airing).
    - **Category Exploration:** Users can dive deeper into specific categories (e.g., "Popular Movies," "Top Rated TV Shows").

2.  **Detailed Media Information:**

    - **Comprehensive Details Pages:** Individual pages for movies and TV shows display rich information including:
      - Title, overview, poster, backdrop images.
      - User ratings (average and count).
      - Release dates (movies) or first/last air dates (TV shows).
      - Status (e.g., Released, Ended, In Production).
      - Genres.
      - Full cast list.
      - Production companies (for TV shows).
      - Number of seasons and episodes, average runtime (for TV shows).
    - **Similar & Recommended Content:** Suggestions for similar movies/TV shows and specific movie recommendations.
    - **Quick View Modal:** A modal allows users to quickly preview movie/TV show details without navigating away from the current list.

3.  **User Authentication & Personalization:**

    - **TMDB Integration:** Secure login via The Movie Database (TMDB) account.
    - **Watchlist Management:** Logged-in users can add or remove movies and TV shows from their personal watchlist.
    - **Account Information:** Users can view their TMDB account details (username, avatar, country) within the app.
    - **Personalized Welcome:** Logged-in users are greeted with a personalized welcome message.

4.  **Search Functionality:**

    - **Global Search:** A prominent search bar in the navigation allows users to find movies and TV shows by title or keyword.
    - **Dedicated Search Results Page:** Displays a clear list of matching movies and TV shows.

5.  **Internationalization (i18n):**

    - **Multi-Language Support:** The UI and content (where available from TMDB) can be displayed in multiple languages (English, Arabic, French, Chinese).
    - **Dynamic Language Switching:** Users can change the language, and the application updates accordingly, including API calls for translated content.
    - **RTL Support:** Correctly renders layout for Right-to-Left languages like Arabic.

6.  **Theming:**

    - **Light & Dark Modes:** Users can switch between a light and a dark theme for comfortable viewing. Theme preference is saved locally.

7.  **Responsive & Modern UI:**
    - **React & Bootstrap:** Built with React and utilizes Bootstrap for a responsive grid system and base components.
    - **Custom Styling:** Extensive custom CSS for a unique look and feel, including animations and transitions.
    - **Lazy Loading:** Page components are lazy-loaded to improve initial load times and performance.
    - **Interactive Elements:** Includes sliders with navigation, modals, and smooth transitions.

## App Structure:

src/
├── apis/ # API configuration (e.g., Axios instances for TMDB)
├── assets/ # Static files like images and SVGs
├── components/ # Reusable UI components
│ ├── account/ # Login, logout, account-related UI
│ ├── details/ # UI for movie/TV show detail views
│ ├── home/ # Components specific to the homepage (e.g., HeroSlider)
│ ├── layout/ # Main layout parts (Navbar, Footer, Section Titles)
│ ├── loaders/ # Loading indicators
│ ├── movies/ # Movie-specific UI (cards, lists)
│ └── tvshows/ # TV show-specific UI (cards, lists)
├── config/ # Application-level configurations (e.g., category endpoints)
├── hooks/ # Custom React Hooks for reusable logic
│ ├── swr/ # Data fetching hooks using SWR
│ └── watchlist/ # Hooks for managing user watchlist
├── pages/ # Top-level components for each route/page
├── store/ # Redux state management
│ └── slice/ # Redux slices for different parts of the state
├── styles/ # Global CSS and theme-specific styles
├── swr/ # SWR global configurations (e.g., fetcher)
├── App.jsx # Main application component (routing, global providers)
├── LanguageContext.jsx # Context for internationalization (i18n)
├── main.jsx # Entry point of the React application
└── translations.js # Text translations for different languages

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

## 🙏 Acknowledgements

- This project uses TMDb API but is not endorsed or certified by TMDb.
- React Bootstrap for UI components.
- SWR for data fetching.
- Redux Toolkit for state management.

import axios from "axios";

const BASE_URL = `https://api.themoviedb.org/3/`;

const axiosInstance = axios.create({
	baseURL: BASE_URL,
});

export const tmdbApi = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: `Bearer ${import.meta.env.VITE_MOVIE_ACCESS_KEY}`,
	},
});

export default axiosInstance;

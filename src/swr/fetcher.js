import { tmdbApi } from "../apis/config";

let fetcher = {
	get: (endpoint) => tmdbApi.get(endpoint).then((res) => res.data),
	post: (endpoint, body) =>
		tmdbApi.post(endpoint, body).then((res) => res.data),
};

export default fetcher;

import useSWR from "swr";
import fetcher from "../../swr/fetcher";

/*
{
    "adult": false,
    "backdrop_path": "/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
    "genre_ids": [
        10751,
        35,
        878
    ],
    "id": 552524,
    "original_language": "en",
    "original_title": "Lilo & Stitch",
    "overview": "The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family.",
    "popularity": 610.335,
    "poster_path": "/3bN675X0K2E5QiAZVChzB5wq90B.jpg",
    "release_date": "2025-05-17",
    "title": "Lilo & Stitch",
    "video": false,
    "vote_average": 7.1,
    "vote_count": 359
}
*/

export default function usePopularMovies() {
	const { isLoading, error, data } = useSWR("movie/popular", fetcher.get);
	console.log(data?.results);
	return { isLoading, error, popMovies: data?.results };
}

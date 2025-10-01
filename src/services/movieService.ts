//Import
import axios from "axios";
import type { Movie } from "../types/movie";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

//SecretKey
const myKey = import.meta.env.VITE_TMDB_API_KEY;

//TMDB Interface
type MovieHttpProps = {
  results: Movie[];
  total_pages: number;
};

//URL Axios
axios.defaults.baseURL = "https://api.themoviedb.org/3/";

//Fetch
const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieHttpProps> => {
  try {
    const response = await axios.get<MovieHttpProps>("search/movie", {
      params: {
        api_key: myKey, //I use v3 API Key
        query,
        include_adult: false,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movies", error);
    throw error;
  }
};

//React Query
export const useMovies = (query: string, currentPage: number) => {
  return useQuery({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });
};

//Import
import { useState, useEffect } from "react";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import { useMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";

//App
export default function App() {
  //States
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const closeModal = () => setIsModalOpen(false);
  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const { data, isLoading, isError, isSuccess } = useMovies(query, currentPage);

  useEffect(() => {
    if (
      isSuccess &&
      data &&
      Array.isArray(data.results) &&
      data.results.length === 0
    ) {
      toast("No movies found for your request.");
    }
  }, [isSuccess, data]);

  const handleSearchSubmit = (q: string) => {
    if (!q.trim()) {
      toast("Please enter a search term.");
      return;
    }
    setQuery(q);
    setCurrentPage(1);
  };

  //Render
  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />

      {data?.total_pages && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data && Array.isArray(data.results) && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={openModal} />
      )}

      {data &&
        Array.isArray(data.results) &&
        data.results.length === 0 &&
        !isLoading &&
        !isError}

      {isModalOpen && selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie} />
      )}

      <Toaster />
    </>
  );
}

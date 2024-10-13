import { useEffect, useState } from "react";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import Modal from "../components/Modal";
import { useAppDispatch, useAppSelector } from "../hooks/movie-hooks";
import { fetchMovies } from "../store/movies-slice";
import Loader from "../components/Loader";
import useQueryParams from "../hooks/useQueryParams";
import ReactPaginate from "react-paginate";
import SearchInput from "../components/SearchInput";
import { useDebounce } from "../hooks/useDebounce";

const MoviesList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, setTitle, pageNumber, pageSize, setPageNumber } =
    useQueryParams();
  const [searchInputValue, setSearchInputValue] = useState(title);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    return JSON.parse(sessionStorage.getItem("searchHistory") || "[]");
  });
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { movies, moviesError, moviesLoading, totalResults } = useAppSelector(
    (state) => state.movies
  );

  const debounce = useDebounce((searchInputValue: string) => {
    setTitle(searchInputValue);

    if (!searchHistory.includes(searchInputValue) && searchInputValue?.length) {
      const updatedHistory = [...searchHistory, searchInputValue];
      setSearchHistory(updatedHistory);
      sessionStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
  }, 500);

  useEffect(() => {
    dispatch(
      fetchMovies({
        pageNumber,
        pageSize,
        searchQuery: title,
      })
    );
  }, [pageNumber, pageSize, title, dispatch]);

  const handleInputChange = (val: string) => {
    setSearchInputValue(val);
    debounce(val);

    const filtered = searchHistory.filter((query) =>
      query.toLowerCase().startsWith(val.toLowerCase())
    );
    console.log({ filtered });
    setFilteredSuggestions(filtered);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchInputValue(suggestion);
    setTitle(suggestion);
    // setFilteredSuggestions([]); // Hide suggestions after selection
  };

  return (
    <>
      <Header addNewMovie={() => setIsModalOpen(true)} />

      <section className="wx py-10 ">
        <div className="flex flex-wrap gap-3 pb-5 items-center border-b border-b-grey-line justify-between">
          <h6 className="text-grey-header font-bold text-lg ">My List</h6>

          <SearchInput
            inputValue={searchInputValue}
            onInputChange={handleInputChange}
            onSuggestionClick={handleSuggestionClick}
            suggestions={filteredSuggestions}
          />
        </div>

        <div className="min-h-[300px] md:min-h-[400px]">
          {/* movies list */}
          {!moviesLoading && (
            <>
              {movies.map((movie, index) => (
                <MovieCard
                  key={index}
                  Title={movie.Title}
                  Year={movie.Year}
                  imdbID={movie.imdbID}
                  Poster={movie.Poster}
                />
              ))}

              <div className="px-2">
                <ReactPaginate
                  breakLabel="..."
                  previousLabel={null}
                  nextLabel={null}
                  onPageChange={(e) => {
                    setPageNumber(e.selected + 1);
                  }}
                  forcePage={pageNumber - 1}
                  pageCount={Math.ceil(totalResults / 10)}
                  renderOnZeroPageCount={null}
                  className="paginator"
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={2}
                />
              </div>
            </>
          )}

          {/* movies loading */}
          {moviesLoading && <Loader />}

          {/* error loading movies */}
          {!moviesLoading && moviesError && (
            <div className="flex flex-col items-center justify-center text-center h-[200px] md:h-[400px] wx gap-4">
              <h1
                className="text-grey-header font-bold text-4xl 
              "
              >
                OOPS!
              </h1>
              <p className="text-grey-body">{moviesError}</p>
            </div>
          )}
        </div>
      </section>

      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default MoviesList;

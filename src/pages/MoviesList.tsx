import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import Modal from "../components/Modal";
import SearchIcon from "/search.svg";
import { useAppDispatch, useAppSelector } from "../hooks/movie-hooks";
import { fetchMovies } from "../store/movies-slice";
import Loader from "../components/Loader";
import useQueryParams from "../hooks/useQueryParams";
import ReactPaginate from "react-paginate";

function useDebounce<
  F extends (...args: Parameters<F>) => void | Promise<void>
>(callback: F, delay: number = 1000) {
  const timeoutId = useRef<number | undefined>();

  const debounceCallbackFn = useCallback(
    (...args: Parameters<F>) => {
      clearTimeout(timeoutId?.current);
      timeoutId.current = setTimeout(() => {
        callback(...args);
      }, delay);

      return () => clearTimeout(timeoutId?.current);
    },
    [callback, delay]
  );

  return debounceCallbackFn;
}

const MoviesList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, setTitle, pageNumber, pageSize, setPageNumber } =
    useQueryParams();
  const [searchInputValue, setSearchInputValue] = useState(title);

  const dispatch = useAppDispatch();
  const { movies, moviesError, moviesLoading, totalResults } = useAppSelector(
    (state) => state.movies
  );

  const debounce = useDebounce((searchInputValue: string) => {
    setTitle(searchInputValue);
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

  return (
    <>
      <Header addNewMovie={() => setIsModalOpen(true)} />

      <section className="wx py-10 ">
        <div className="flex flex-wrap gap-3 pb-5 items-center border-b border-b-grey-line justify-between">
          <h6 className="text-grey-header font-bold text-lg ">My List</h6>

          <div className="relative">
            <img
              src={SearchIcon}
              alt="Search Icon"
              className="w-[18px] absolute left-3 top-3"
            />
            <input
              type="text"
              className="bg-transparent border-grey-line text-grey-header border rounded-md pl-9 pr-3 py-2 placeholder:text-sm outline-0 focus:border-grey-header"
              placeholder="Search Movie"
              value={searchInputValue}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                setSearchInputValue(event.target.value);
                debounce(value);
              }}
            />
          </div>
        </div>

        <div className="min-h-[400px]">
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

              {/* <p>"page count:" {Math.ceil(totalResults / 10)}</p>
              <p>"page number:" {pageNumber}</p> */}

              <div className="px-2">
                <ReactPaginate
                  breakLabel="..."
                  previousLabel={null}
                  nextLabel={null}
                  onPageChange={(e) => {
                    //   console.log(e);
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
            <div className="flex flex-col items-center justify-center text-center h-[400px] wx gap-4">
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

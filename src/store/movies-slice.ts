import { IMovie, IMovieSummary } from "../models/movie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface MoviesState {
  movies: IMovieSummary[];
  moviesLoading: boolean;
  moviesError: string | null;
  totalResults: number;

  singleMovie: IMovie | null;
  singleMovieLoading: boolean;
  singleMovieError: string | null;
}

const initialState: MoviesState = {
  movies: [],
  moviesLoading: false,
  moviesError: null,
  totalResults: 0,

  singleMovie: null,
  singleMovieLoading: false,
  singleMovieError: null,
};

export const fetchMovies = createAsyncThunk(
  "GET_MOVIES",
  async ({
    pageNumber,
    // pageSize,
    searchQuery,
  }: {
    pageNumber: number;
    pageSize: number;
    searchQuery: string;
  }) => {
    const response = await fetch(
      `https://www.omdbapi.com/?page=${pageNumber}&s=${
        searchQuery?.length ? searchQuery : "lion"
      }&apikey=c4fcb4ee`
    );
    const data = await response.json();
    if (data.Response !== "True") {
      throw new Error(data.Error);
    }
    return data;
  }
);

export const fetchSingleMovie = createAsyncThunk(
  "GET_SINGLE_MOVIE",
  async (id: string) => {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=c4fcb4ee`
    );
    const data = await response.json();
    if (data.Response !== "True") {
      throw new Error(data.Error);
    }
    return data;
  }
);

export const moviesSlice = createSlice({
  name: "MOVIES",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.moviesLoading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.moviesLoading = false;
        state.movies = action.payload.Search;
        state.moviesError = null;
        state.totalResults = +action.payload.totalResults;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.moviesLoading = false;
        state.movies = [];
        state.moviesError = action.error.message as string;
        state.totalResults = 0;
      })

      .addCase(fetchSingleMovie.pending, (state) => {
        state.singleMovieLoading = true;
      })
      .addCase(fetchSingleMovie.fulfilled, (state, action) => {
        state.singleMovieLoading = false;
        state.singleMovie = action.payload;
        state.singleMovieError = null;
      })
      .addCase(fetchSingleMovie.rejected, (state, action) => {
        state.singleMovieLoading = false;
        state.singleMovie = null;
        state.singleMovieError = action.error.message as string;
      });
  },
});

export default moviesSlice.reducer;

// import ProfileIcon from "/profile-icon.png";

import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { fetchSingleMovie } from "../store/movies-slice";
import { useAppDispatch, useAppSelector } from "../hooks/movie-hooks";
import Loader from "../components/Loader";

const placeholderPoster =
  "https://m.media-amazon.com/images/M/MV5BYzA2ODU3OWQtNjVhNi00OTU3LTg5M2UtYTI5ZWE0MDAzYTJjXkEyXkFqcGdeQXVyNDI3NjcxMDA@._V1_SX300.jpg";

const placeholderPlot =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit blanditiis excepturi illum ipsam earum, unde inventore, laboriosam minima ratione repudiandae hic delectus non provident aspernatur, aliquid incidunt facere doloremque iure.";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch(); // Use the typed dispatch
  const { singleMovie, singleMovieError, singleMovieLoading } = useAppSelector(
    (state) => state.movies
  );

  useEffect(() => {
    if (id) dispatch(fetchSingleMovie(id));
  }, [id, dispatch]);

  return (
    <section className="min-h-[80vh]">
      {!singleMovieLoading && singleMovie && (
        <>
          <div
            style={
              {
                //   backgroundImage: `linear-gradient(transparent, rgb(0 0 0 / 59%)), url(${singleMovie.Poster})`,
              }
            }
            className="wx w-full h-[200px] md:h-[400px] bg-cover  flex items-center justify-center text-center text-grey-header"
          >
            <div className="glitch" data-glitch={singleMovie?.Title}>
              {singleMovie?.Title}
            </div>
          </div>
          <div className="wx pt-3 md:pt-5 pb-10 md:pb-20 movie-details-grid">
            {/* title holder */}
            <div className="title-holder">
              <h6 className="text-white font-bold text-xl md:text-2xl mt-3">
                {singleMovie.Title}
              </h6>

              <p className="text-grey-body text-sm mt-1">
                <span className="text-grey-header">Released:</span>{" "}
                {singleMovie.Released}
              </p>

              <p className="text-grey-body text-sm mt-1">
                <span className="text-grey-header">Directed by:</span>{" "}
                {singleMovie.Director}
              </p>
              <p className="text-grey-body text-sm mt-1">
                <span className="text-grey-header">Language:</span>{" "}
                {singleMovie.Language}
              </p>
              <p className="text-grey-body text-sm mt-1">
                <span className="text-grey-header">Country:</span>{" "}
                {singleMovie.Country}
              </p>
            </div>

            {/* poster image */}
            <div className="poster-image-holder">
              <img
                src={
                  singleMovie.Poster === "N/A" || !singleMovie.Poster
                    ? placeholderPoster
                    : singleMovie.Poster
                }
                className="w-[100px] h-[150px] md:w-[156px] md:h-[230px] rounded-md border border-grey-line"
                alt={`${singleMovie.Title} Poster Image`}
              />
            </div>

            {/* other details */}
            <div className="other-details-holder ">
              <p className="text-grey-header">
                {singleMovie.Plot === "N/A" || !singleMovie.Plot
                  ? placeholderPlot
                  : singleMovie.Plot}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {singleMovie.Genre.split(", ").map((x) => (
                  <div
                    key={x}
                    className="bg-[#445566] text-grey-header px-2 py-[2px] text-xs rounded"
                  >
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {singleMovieLoading && <Loader />}

      {!singleMovieLoading && singleMovieError && (
        <div className="flex flex-col items-center text-center pt-20 wx gap-4">
          <h1
            className="text-grey-header font-bold text-6xl 
            "
          >
            OOPS!
          </h1>
          <p className="text-xl">Page not found</p>

          <NavLink to="/">
            <button className="button-primary">Go Home</button>
          </NavLink>
        </div>
      )}
    </section>
  );
};

export default MovieDetails;

export const TempMovieData = {
  Title: "The Lion King",
  Year: "1994",
  Rated: "G",
  Released: "24 Jun 1994",
  Runtime: "88 min",
  Genre: "Animation, Adventure, Drama",
  Director: "Roger Allers, Rob Minkoff",
  Writer: "Irene Mecchi, Jonathan Roberts, Linda Woolverton",
  Actors: "Matthew Broderick, Jeremy Irons, James Earl Jones",
  Plot: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
  Language: "English, Swahili, Xhosa, Zulu",
  Country: "United States",
  Awards: "Won 2 Oscars. 43 wins & 35 nominations total",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BZGRiZDZhZjItM2M3ZC00Y2IyLTk3Y2MtMWY5YjliNDFkZTJlXkEyXkFqcGc@._V1_SX300.jpg",
  Ratings: [
    {
      Source: "Internet Movie Database",
      Value: "8.5/10",
    },
    {
      Source: "Rotten Tomatoes",
      Value: "92%",
    },
    {
      Source: "Metacritic",
      Value: "88/100",
    },
  ],
  Metascore: "88",
  imdbRating: "8.5",
  imdbVotes: "1,164,125",
  imdbID: "tt0110357",
  Type: "movie",
  DVD: "N/A",
  BoxOffice: "$424,979,720",
  Production: "N/A",
  Website: "N/A",
  Response: "True",
};

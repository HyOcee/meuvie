import { NavLink } from "react-router-dom";
import { IMovieSummary } from "../models/movie";
import ProfileIcon from "/profile-icon.png";

const placeholderPoster =
  "https://m.media-amazon.com/images/M/MV5BYzA2ODU3OWQtNjVhNi00OTU3LTg5M2UtYTI5ZWE0MDAzYTJjXkEyXkFqcGdeQXVyNDI3NjcxMDA@._V1_SX300.jpg";

const MovieCard = ({ Title, Year, Poster, imdbID }: IMovieSummary) => {
  return (
    <div className="border-b border-b-grey-line py-3 flex gap-3">
      <img
        src={Poster === "N/A" || !Poster ? placeholderPoster : Poster}
        alt={`${Title} Poster Image`}
        className="w-[76px] h-[110px] object-cover"
      />

      <div className="flex-1">
        <NavLink
          className="font-bold text-xl md:text-2xl hover:underline"
          to={`/movie-details/${imdbID}`}
        >
          {Title} &nbsp;
          <span className="text-grey-line font-medium text-lg md:text-xl">
            {Year}
          </span>
        </NavLink>

        <div className="flex mt-2 items-center gap-2">
          <img
            src={ProfileIcon}
            alt="Author"
            className="w-5 h-5 rounded-full"
          />
          <span className="text-grey-header text-sm">Adam Smite</span>
        </div>

        <p className="text-sm text-grey-body">
          Believe me, I know. I'm as surprised as you are. Not sure I've ever
          been unironically this far in ....
        </p>
      </div>
    </div>
  );
};

export default MovieCard;

export interface IMovieSummary {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

export interface IMovie {
  Title: string; // "The Lion King";
  Year: string; // "1994";
  Rated: string; // "G";
  Released: string; // "24 Jun 1994";
  Runtime: string; // "88 min";
  Genre: string; // "Animation, Adventure, Drama";
  Director: string; // "Roger Allers, Rob Minkoff";
  Writer: string; // "Irene Mecchi, Jonathan Roberts, Linda Woolverton";
  Actors: string; // "Matthew Broderick, Jeremy Irons, James Earl Jones";
  Plot: string; // "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.";
  Language: string; // "English, Swahili, Xhosa, Zulu";
  Country: string; // "United States";
  Awards: string; // "Won 2 Oscars. 43 wins & 35 nominations total";
  Poster: string; // "https://m.media-amazon.com/images/M/MV5BZGRiZDZhZjItM2M3ZC00Y2IyLTk3Y2MtMWY5YjliNDFkZTJlXkEyXkFqcGc@._V1_SX300.jpg";
  Ratings: {
    Source: string; // "Internet Movie Database";
    Value: string; // "8.5/10";
  }[];
  Metascore: string; // "88";
  imdbRating: string; // "8.5";
  imdbVotes: string; // "1,164,125";
  imdbID: string; // "tt0110357";
  Type: string; // "movie";
  DVD: string; // "N/A";
  BoxOffice: string; // "$424,979,720";
  Production: string; // "N/A";
  Website: string; // "N/A";
  Response: string; // "True";
}

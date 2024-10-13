import Layout from "./layouts/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MoviesList from "./pages/MoviesList";
import MovieDetails from "./pages/MovieDetails";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MoviesList />} />
            <Route path="/movie-details/:id" element={<MovieDetails />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

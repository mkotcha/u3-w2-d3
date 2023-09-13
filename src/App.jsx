import { BrowserRouter, Routes, Route } from "react-router-dom";
import Galleries from "./components/Galleries";
import PageFooter from "./components/PageFooter";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import TopBar from "./components/TopBar";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/tv-shows" element={<Galleries />} />
        <Route path="/movie-details/:imdbID" element={<MovieDetails />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <PageFooter />
    </BrowserRouter>
  );
}

export default App;

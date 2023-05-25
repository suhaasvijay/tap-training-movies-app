import {Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import MovieDetails from "./pages/MovieDetails";

const Router = () => { 
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/add-movie" element={<AddMovie />} />
            <Route exact path="/:movieId" element={<MovieDetails />} />
        </Routes>
    );
}

export default Router;
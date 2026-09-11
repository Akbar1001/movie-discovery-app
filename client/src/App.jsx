
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import Wishlist from "./pages/Wishlist";
import Credits from "./pages/Credits";



function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/search"
                    element={<Search />}
                />

                <Route
                    path="/movies/:id"
                    element={<MovieDetails />}
                />

                <Route
                    path="/wishlist"
                    element={<Wishlist />}
                />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

                <Route
                    path="/credits"
                    element={<Credits />}
                />


            </Routes>
        </>
    );
}

export default App;


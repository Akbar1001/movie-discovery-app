import { Routes, Route, Navigate } from "react-router-dom";

import Search from "./pages/Search";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </>
    );
}

export default App;
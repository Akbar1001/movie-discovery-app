import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedSearch = search.trim();

        if (!trimmedSearch) {
            return;
        }

        navigate(`/search?q=${encodeURIComponent(trimmedSearch)}`);
    };

    return (
        <header className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="logo">
                    🎬 Movie Discovery
                </Link>

                <form
                    className="search-form"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="search"
                        placeholder="Search movies..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />

                    <button type="submit">
                        Search
                    </button>
                </form>

                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    <Link to="/credits">Credits</Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
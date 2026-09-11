
import { Link } from "react-router-dom";

import useWishlist from "../hooks/useWishlist";

const Wishlist = () => {
    const {
        wishlist,
        isLoading,
        isError,
        error,
        removeFromWishlist,
        isRemoving,
    } = useWishlist();

    if (isLoading) {
        return (
            <main>
                <h1>My Wishlist</h1>
                <p>Loading your wishlist...</p>
            </main>
        );
    }

    if (isError) {
        return (
            <main>
                <h1>My Wishlist</h1>

                <p>
                    Failed to load wishlist:{" "}
                    {error?.response?.data?.message ||
                        error.message}
                </p>
            </main>
        );
    }

    return (
        <main>
            <div className="page-header">
                <div>
                    <h1>My Wishlist</h1>
                    <p className="wishlist-count">
                        {wishlist.length}{" "}
                        {wishlist.length === 1
                            ? "movie"
                            : "movies"}
                    </p>
                </div>
            </div>

            {wishlist.length === 0 ? (
                <div className="empty-wishlist">
                    <h2>Your wishlist is empty</h2>

                    <p>
                        Browse movies and add your
                        favorites to your wishlist.
                    </p>

                    <Link
                        to="/"
                        className="browse-movies-button"
                    >
                        Browse Movies
                    </Link>
                </div>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map((movie) => (
                        <div
                            className="wishlist-item"
                            key={movie.movieId}
                        >
                            <Link
                                to={`/movies/${movie.movieId}`}
                                className="movie-card"
                            >
                                <div className="movie-poster">
                                    {movie.posterUrl ? (
                                        <img
                                            src={
                                                movie.posterUrl
                                            }
                                            alt={
                                                movie.title
                                            }
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="poster-placeholder">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                <div className="movie-info">
                                    <h3>
                                        {movie.title}
                                    </h3>

                                    <div className="movie-meta">
                                        <span>
                                            {movie.releaseDate
                                                ? movie.releaseDate.slice(
                                                      0,
                                                      4
                                                  )
                                                : "N/A"}
                                        </span>

                                        <span>
                                            ⭐{" "}
                                            {Number(
                                                movie.rating
                                            ).toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            <button
                                type="button"
                                className="remove-wishlist-button"
                                onClick={() =>
                                    removeFromWishlist(
                                        movie.movieId
                                    )
                                }
                                disabled={isRemoving}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default Wishlist;

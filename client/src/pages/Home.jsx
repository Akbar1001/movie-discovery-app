import { useState } from "react";

import useMovies from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";

const Home = () => {
    const [page, setPage] = useState(1);

    const {
        data,
        isLoading,
        isError,
        error,
        isFetching,
    } = useMovies({
        page,
    });

    const movies = data?.data || [];
    const pagination = data?.pagination;

    const handlePrevious = () => {
        setPage((currentPage) => Math.max(1, currentPage - 1));
    };

    const handleNext = () => {
        if (pagination && page < pagination.totalPages) {
            setPage((currentPage) => currentPage + 1);
        }
    };

    if (isLoading) {
        return (
            <main>
                <h1>Popular Movies</h1>
                <p>Loading movies...</p>
            </main>
        );
    }

    if (isError) {
        return (
            <main>
                <h1>Popular Movies</h1>
                <p>
                    Failed to load movies:{" "}
                    {error?.response?.data?.message || error.message}
                </p>
            </main>
        );
    }

    return (
        <main>
            <div className="page-header">
                <div>
                    <h1>Popular Movies</h1>

                    {isFetching && (
                        <span className="loading-text">
                            Updating...
                        </span>
                    )}
                </div>
            </div>

            {movies.length === 0 ? (
                <p>No movies found.</p>
            ) : (
                <div className="movie-grid">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            )}

            {pagination && (
                <div className="pagination">
                    <button
                        onClick={handlePrevious}
                        disabled={page === 1 || isFetching}
                    >
                        Previous
                    </button>

                    <span>
                        Page {pagination.page} of{" "}
                        {pagination.totalPages}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={
                            page >= pagination.totalPages ||
                            isFetching
                        }
                    >
                        Next
                    </button>
                </div>
            )}
        </main>
    );
};

export default Home;
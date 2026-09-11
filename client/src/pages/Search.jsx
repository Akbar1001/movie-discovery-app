
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useMovies from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";

const Search = () => {
    const [searchParams] = useSearchParams();

    const search = searchParams.get("q") || "";
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [search]);

    const {
        data,
        isLoading,
        isError,
        error,
        isFetching,
    } = useMovies({
        search,
        page,
    });

    const movies = data?.data || [];
    const pagination = data?.pagination;

    if (!search) {
        return (
            <main>
                <h1>Search Movies</h1>
                <p>Enter a movie name to search.</p>
            </main>
        );
    }

    if (isLoading) {
        return (
            <main>
                <h1>Search Results</h1>
                <p>Searching for "{search}"...</p>
            </main>
        );
    }

    if (isError) {
        return (
            <main>
                <h1>Search Results</h1>
                <p>
                    Failed to search movies:{" "}
                    {error?.response?.data?.message ||
                        error.message}
                </p>
            </main>
        );
    }

    const handlePrevious = () => {
        setPage((currentPage) =>
            Math.max(1, currentPage - 1)
        );
    };

    const handleNext = () => {
        if (
            pagination &&
            page < pagination.totalPages
        ) {
            setPage((currentPage) => currentPage + 1);
        }
    };

    return (
        <main>
            <div className="page-header">
                <div>
                    <h1>
                        Search Results for "{search}"
                    </h1>

                    {isFetching && (
                        <span className="loading-text">
                            Updating...
                        </span>
                    )}
                </div>
            </div>

            {movies.length === 0 ? (
                <p>
                    No movies found for "{search}".
                </p>
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

            {pagination && pagination.totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={handlePrevious}
                        disabled={
                            page === 1 || isFetching
                        }
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

export default Search;


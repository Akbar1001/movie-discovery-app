
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useMovies from "../hooks/useMovies";
import { getGenres } from "../api/movies";
import MovieCard from "../components/MovieCard";

const Home = () => {
    const [page, setPage] = useState(1);

    const [filters, setFilters] = useState({
        genre: "",
        year: "",
        minRating: "",
        sort: "popularity.desc",
    });

     const {
        data,
        isLoading,
        isError,
        error,
        isFetching,
    } = useMovies({
        page,
        ...(filters.genre && { genre: filters.genre }),
        ...(filters.year && { year: filters.year }),
        ...(filters.minRating && {
            minRating: filters.minRating,
        }),
        sort: filters.sort,
    });

    const {
        data: genreData,
        isLoading: genresLoading,
    } = useQuery({
        queryKey: ["genres"],
        queryFn: getGenres,
        staleTime: 60 * 60 * 1000,
    });

    const movies = data?.data || [];
    const pagination = data?.pagination;
    const genres = genreData?.data || [];

    useEffect(() => {
        setPage(1);
    }, [
        filters.genre,
        filters.year,
        filters.minRating,
        filters.sort,
    ]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        setFilters((currentFilters) => ({
            ...currentFilters,
            [name]: value,
        }));
    };

    const handleClearFilters = () => {
        setFilters({
            genre: "",
            year: "",
            minRating: "",
            sort: "popularity.desc",
        });

        setPage(1);
    };

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

    if (isLoading) {
        return (
            <main>
                <h1>Discover Movies</h1>
                <p>Loading movies...</p>
            </main>
        );
    }

    if (isError) {
        return (
            <main>
                <h1>Discover Movies</h1>
                <p>
                    Failed to load movies:{" "}
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
                    <h1>Discover Movies</h1>

                    {isFetching && (
                        <span className="loading-text">
                            Updating...
                        </span>
                    )}
                </div>
            </div>

            <section className="filters">
                <select
                    name="genre"
                    value={filters.genre}
                    onChange={handleFilterChange}
                >
                    <option value="">All Genres</option>

                    {genresLoading ? (
                        <option disabled>
                            Loading genres...
                        </option>
                    ) : (
                        genres.map((genre) => (
                            <option
                                key={genre.id}
                                value={genre.id}
                            >
                                {genre.name}
                            </option>
                        ))
                    )}
                </select>

                <input
                    type="number"
                    name="year"
                    placeholder="Release year"
                    min="1900"
                    max="2100"
                    value={filters.year}
                    onChange={handleFilterChange}
                />

                <select
                    name="minRating"
                    value={filters.minRating}
                    onChange={handleFilterChange}
                >
                    <option value="">
                        Any Rating
                    </option>
                    <option value="5">5+ ⭐</option>
                    <option value="6">6+ ⭐</option>
                    <option value="7">7+ ⭐</option>
                    <option value="8">8+ ⭐</option>
                    <option value="9">9+ ⭐</option>
                </select>

                <select
                    name="sort"
                    value={filters.sort}
                    onChange={handleFilterChange}
                >
                    <option value="popularity.desc">
                        Most Popular
                    </option>

                    <option value="popularity.asc">
                        Least Popular
                    </option>

                    <option value="vote_average.desc">
                        Highest Rated
                    </option>

                    <option value="vote_average.asc">
                        Lowest Rated
                    </option>

                    <option value="primary_release_date.desc">
                        Newest Releases
                    </option>

                    <option value="primary_release_date.asc">
                        Oldest Releases
                    </option>

                    <option value="title.asc">
                        Title A-Z
                    </option>

                    <option value="title.desc">
                        Title Z-A
                    </option>
                </select>

                <button
                    type="button"
                    onClick={handleClearFilters}
                >
                    Clear
                </button>
            </section>

            {movies.length === 0 ? (
                <p>No movies found for these filters.</p>
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
                            page >=
                                pagination.totalPages ||
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


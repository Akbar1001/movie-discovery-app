import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getMovies } from "../api/movies";
import MovieCard from "../components/MovieCard";

const Search = () => {
    const [searchParams] = useSearchParams();

    const search = searchParams.get("q") || "";

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["movies", { search }],
        queryFn: () => getMovies({ search }),
        enabled: Boolean(search),
    });

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
                <h1>Searching for "{search}"...</h1>
                <p>Loading movies...</p>
            </main>
        );
    }

    if (isError) {
        return (
            <main>
                <h1>Search Results</h1>
                <p>
                    Failed to search movies:{" "}
                    {error?.response?.data?.message || error.message}
                </p>
            </main>
        );
    }

    const movies = data?.data || [];

    return (
        <main>
            <h1>Search Results for "{search}"</h1>

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
        </main>
    );
};

export default Search;
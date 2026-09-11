import { useQuery } from "@tanstack/react-query";

import { getMovies } from "../api/movies";
import MovieCard from "../components/MovieCard";

const Home = () => {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["movies", { page: 1 }],
        queryFn: () => getMovies({ page: 1 }),
    });

    if (isLoading) {
        return <p>Loading movies...</p>;
    }

    if (isError) {
        return (
            <p>
                Failed to load movies:{" "}
                {error?.response?.data?.message || error.message}
            </p>
        );
    }

    const movies = data?.data || [];

    return (
        <main>
            <h1>Popular Movies</h1>

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

export default Home;
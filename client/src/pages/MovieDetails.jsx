
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getMovieDetails } from "../api/movies";

const MovieDetails = () => {
    const { id } = useParams();

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["movie", id],
        queryFn: () => getMovieDetails(id),
        enabled: Boolean(id),
    });

    if (isLoading) {
        return (
            <main>
                <p>Loading movie details...</p>
            </main>
        );
    }

    if (isError) {
        return (
            <main>
                <h1>Movie Details</h1>

                <p>
                    Failed to load movie:{" "}
                    {error?.response?.data?.message ||
                        error.message}
                </p>

                <Link to="/">Back to movies</Link>
            </main>
        );
    }

    const movie = data?.data;

    if (!movie) {
        return (
            <main>
                <h1>Movie Not Found</h1>
                <Link to="/">Back to movies</Link>
            </main>
        );
    }

    return (
        <main>
            <Link to="/" className="back-link">
                ← Back to movies
            </Link>

            <section className="movie-details">
                {movie.backdropUrl && (
                    <div className="movie-backdrop">
                        <img
                            src={movie.backdropUrl}
                            alt=""
                        />
                    </div>
                )}

                <div className="movie-details-content">
                    <div className="movie-details-poster">
                        {movie.posterUrl ? (
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                            />
                        ) : (
                            <div className="poster-placeholder">
                                No Image
                            </div>
                        )}
                    </div>

                    <div className="movie-details-info">
                        <h1>{movie.title}</h1>

                        {movie.tagline && (
                            <p className="movie-tagline">
                                {movie.tagline}
                            </p>
                        )}

                        <div className="movie-details-meta">
                            <span>
                                ⭐{" "}
                                {movie.rating.toFixed(1)}
                            </span>

                            <span>
                                {movie.releaseDate
                                    ? movie.releaseDate.slice(
                                          0,
                                          4
                                      )
                                    : "N/A"}
                            </span>

                            {movie.runtime && (
                                <span>
                                    {movie.runtime} min
                                </span>
                            )}
                        </div>

                        {movie.genres?.length > 0 && (
                            <div className="genre-list">
                                {movie.genres.map(
                                    (genre) => (
                                        <span
                                            key={genre.id}
                                        >
                                            {genre.name}
                                        </span>
                                    )
                                )}
                            </div>
                        )}

                        <div className="movie-description">
                            <h2>Overview</h2>

                            <p>{movie.overview}</p>
                        </div>

                        <div className="movie-extra-info">
                            {movie.originalLanguage && (
                                <p>
                                    <strong>
                                        Language:
                                    </strong>{" "}
                                    {movie.originalLanguage.toUpperCase()}
                                </p>
                            )}

                            {movie.status && (
                                <p>
                                    <strong>
                                        Status:
                                    </strong>{" "}
                                    {movie.status}
                                </p>
                            )}

                            <p>
                                <strong>
                                    Votes:
                                </strong>{" "}
                                {movie.voteCount.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default MovieDetails;


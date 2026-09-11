import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movies/${movie.id}`} className="movie-card">
            <div className="movie-poster">
                {movie.posterUrl ? (
                    <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        loading="lazy"
                    />
                ) : (
                    <div className="poster-placeholder">
                        No Image
                    </div>
                )}
            </div>

            <div className="movie-info">
                <h3>{movie.title}</h3>

                <div className="movie-meta">
                    <span>
                        {movie.releaseDate
                            ? movie.releaseDate.slice(0, 4)
                            : "N/A"}
                    </span>

                    <span>⭐ {movie.rating.toFixed(1)}</span>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
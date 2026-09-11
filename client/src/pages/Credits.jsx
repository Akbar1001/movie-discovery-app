const Credits = () => {
    return (
        <main className="credits-page">
            <h1>Credits</h1>

            <section className="credits-section">
                <h2>Movie Data</h2>

                <a
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="tmdb-logo-link"
                >
                    <img
                        src="/tmdb-logo.svg"
                        alt="TMDB"
                        className="tmdb-logo"
                    />
                </a>

                <p>
                    This product uses the TMDB API but is not
                    endorsed or certified by TMDB.
                </p>

                <a
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="tmdb-link"
                >
                    Visit TMDB
                </a>
            </section>
        </main>
    );
};

export default Credits;
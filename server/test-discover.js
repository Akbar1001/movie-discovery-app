require("dotenv").config();

const test = async () => {
    try {
        const url = new URL(
            "https://api.themoviedb.org/3/discover/movie"
        );

        url.searchParams.set("api_key", process.env.TMDB_API_KEY);
        url.searchParams.set("language", "en-US");
        url.searchParams.set("page", "1");
        url.searchParams.set("sort_by", "popularity.desc");
        url.searchParams.set("include_adult", "false");

        console.log("Requesting:");
        console.log(url.toString().replace(process.env.TMDB_API_KEY, "***"));

        const response = await fetch(url);

        console.log("Status:", response.status);

        const data = await response.text();

        console.log("Response length:", data.length);
        console.log(data.substring(0, 500));
    } catch (error) {
        console.error("Request failed");
        console.error("Name:", error.name);
        console.error("Message:", error.message);
        console.error("Cause:", error.cause);
    }
};

test();
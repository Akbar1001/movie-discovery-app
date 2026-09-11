require("dotenv").config();

const axios = require("axios");

async function test() {
    try {
        console.log("Testing TMDB...");
        console.log("Token exists:", !!process.env.TMDB_API_KEY);

        const response = await axios.get(
            "https://api.themoviedb.org/3/discover/movie",
            {
                params: {
                    language: "en-US",
                    page: 1,
                    sort_by: "popularity.desc",
                },
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
                    accept: "application/json",
                },
                timeout: 15000,
            }
        );

        console.log("Status:", response.status);
        console.log("Movies:", response.data.results.length);
    } catch (error) {
        console.error("TMDB test failed");
        console.error("Code:", error.code);
        console.error("Message:", error.message);

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        }
    }
}

test();
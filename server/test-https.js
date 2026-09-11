require("dotenv").config();

const https = require("https");

const request = https.request(
    {
        hostname: "api.themoviedb.org",
        path: "/3/configuration",
        method: "GET",
        family: 4,
        headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            accept: "application/json",
        },
    },
    (response) => {
        console.log("Status:", response.statusCode);

        let data = "";

        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            console.log("Response:");
            console.log(data);
        });
    }
);

request.on("error", (error) => {
    console.error("HTTPS request failed");
    console.error("Code:", error.code);
    console.error("Message:", error.message);
});

request.end();
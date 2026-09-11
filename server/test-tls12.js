require("dotenv").config();

const https = require("https");

const options = {
    hostname: "api.themoviedb.org",
    path: "/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc&include_adult=false",
    method: "GET",

    family: 4,

    minVersion: "TLSv1.2",
    maxVersion: "TLSv1.2",

    headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: "application/json",
    },
};

const request = https.request(options, (response) => {
    console.log("Status:", response.statusCode);
    console.log("TLS:", response.socket.getProtocol());

    let data = "";

    response.on("data", (chunk) => {
        data += chunk;
    });

    response.on("end", () => {
        console.log("Response length:", data.length);
        console.log(data.substring(0, 300));
    });
});

request.on("error", (error) => {
    console.error("Request failed");
    console.error("Code:", error.code);
    console.error("Message:", error.message);
});

request.end();
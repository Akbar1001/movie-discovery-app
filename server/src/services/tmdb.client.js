const https = require("https");

const tmdbRequest = async (endpoint, params = {}) => {
    const url = new URL(`https://api.themoviedb.org/3${endpoint}`);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.set(key, value);
        }
    });

    const data = await new Promise((resolve, reject) => {
        const request = https.request(
    url,
    {
        method: "GET",
        family: 4,
        minVersion: "TLSv1.2",
        maxVersion: "TLSv1.2",
        timeout: 15000,
        headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            accept: "application/json",
        },
    },
            (response) => {
                let body = "";

                response.on("data", (chunk) => {
                    body += chunk;
                });

                response.on("end", () => {
                    try {
                        const parsed = JSON.parse(body);

                        if (response.statusCode < 200 || response.statusCode >= 300) {
                            const error = new Error(
                                parsed.status_message || "TMDB request failed"
                            );

                            error.status = response.statusCode;
                            error.tmdbCode = parsed.status_code;

                            return reject(error);
                        }

                        resolve(parsed);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        );

        request.on("error", reject);

        request.on("timeout", () => {
        request.destroy(new Error("TMDB request timed out"));
});

        request.end();
    });

    return data;
};

module.exports = tmdbRequest;
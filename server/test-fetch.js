require("dotenv").config();

const test = async () => {
    try {
        const response = await fetch(
            "https://api.themoviedb.org/3/configuration",
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
                    accept: "application/json",
                },
            }
        );

        console.log("Status:", response.status);
        console.log(await response.text());
    } catch (error) {
        console.error("Fetch request failed");
        console.error("Name:", error.name);
        console.error("Message:", error.message);
        console.error("Cause:", error.cause);
        console.error("Cause code:", error.cause?.code);
        console.error("Cause message:", error.cause?.message);
    }
};

test();
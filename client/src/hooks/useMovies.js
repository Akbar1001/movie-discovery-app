
import {
    keepPreviousData,
    useQuery,
} from "@tanstack/react-query";

import { getMovies } from "../api/movies";

const useMovies = (filters = {}) => {
    return useQuery({
        queryKey: ["movies", filters],

        queryFn: ({ signal }) =>
            getMovies(filters, signal),

        placeholderData: keepPreviousData,
    });
};

export default useMovies;

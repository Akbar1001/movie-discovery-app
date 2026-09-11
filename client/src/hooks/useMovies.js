import {
    keepPreviousData,
    useQuery,
} from "@tanstack/react-query";

import { getMovies } from "../api/movies";

const useMovies = (filters = {}) => {
    return useQuery({
        queryKey: ["movies", filters],
        queryFn: () => getMovies(filters),
        placeholderData: keepPreviousData,
    });
};

export default useMovies;
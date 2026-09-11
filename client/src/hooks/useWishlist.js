
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
} from "../api/wishlist";

import getDeviceId from "../utils/deviceId";

const useWishlist = () => {
    const queryClient = useQueryClient();

    const deviceId = getDeviceId();

    const wishlistQuery = useQuery({
        queryKey: ["wishlist", deviceId],
        queryFn: () => getWishlist(deviceId),
    });

    const addMutation = useMutation({
        mutationFn: (movie) =>
            addToWishlist(deviceId, movie),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wishlist", deviceId],
            });
        },
    });

    const removeMutation = useMutation({
        mutationFn: (movieId) =>
            removeFromWishlist(
                deviceId,
                movieId
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wishlist", deviceId],
            });
        },
    });

    const wishlist = wishlistQuery.data?.data || [];

    const isInWishlist = (movieId) => {
        return wishlist.some(
            (movie) => movie.movieId === movieId
        );
    };

    return {
        wishlist,
        isLoading: wishlistQuery.isLoading,
        isError: wishlistQuery.isError,
        error: wishlistQuery.error,

        addToWishlist: addMutation.mutate,
        removeFromWishlist: removeMutation.mutate,

        isAdding: addMutation.isPending,
        isRemoving: removeMutation.isPending,

        isInWishlist,
    };
};

export default useWishlist;

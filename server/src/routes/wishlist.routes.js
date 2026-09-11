const express = require("express");

const wishlistController = require("../controllers/wishlist.controller");
const validate = require("../middleware/validate");

const {
    getWishlistSchema,
    addWishlistSchema,
    removeWishlistSchema,
} = require("../middleware/wishlist.validation");

const router = express.Router();

router.get(
    "/",
    validate(getWishlistSchema),
    wishlistController.getWishlist
);

router.post(
    "/",
    validate(addWishlistSchema),
    wishlistController.addToWishlist
);

router.delete(
    "/:movieId",
    validate(removeWishlistSchema),
    wishlistController.removeFromWishlist
);

module.exports = router;
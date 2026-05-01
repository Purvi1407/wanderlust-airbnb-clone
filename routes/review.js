const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewsController = require("../controllers/review.js");

// CREATE review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewsController.create));

// DELETE review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewsController.destroy));

module.exports = router;
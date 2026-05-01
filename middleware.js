const Listing = require("./models/listing");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError");
const Review = require("./models/review.js");



module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};



module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.redirectUrl = req.session.returnTo;
    delete req.session.returnTo;
  }
  next();
};



module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  if (!req.user || !listing.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};



module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    return next(new ExpressError(400, errMsg)); // ✅ FIXED (no throw)
  }

  next();
};



module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    return next(new ExpressError(400, errMsg)); // ✅ FIXED
  }

  next();
};



module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);


  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect(`/listings/${id}`);
  }


  if (!req.user || !review.author.equals(req.user._id)) {
    req.flash("error", "You did not create this review!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};
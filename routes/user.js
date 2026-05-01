const express = require("express");
const router = express.Router();

const passport = require("passport");
const usersController = require("../controllers/user.js");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");

router.get("/signup", usersController.renderSignup);
router.post("/signup", usersController.signup);

router.get("/login", usersController.renderLogin);

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    usersController.login
);

router.get("/logout", isLoggedIn, usersController.logout);

module.exports = router;
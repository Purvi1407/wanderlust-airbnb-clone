const Listing = require("../models/listing.js");
const { cloudinary } = require("../cloud-config");
const fs = require("fs");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const geocodingClient = mbxGeocoding({
    accessToken: process.env.MAP_TOKEN
});


// INDEX ROUTE
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// NEW ROUTE
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// SHOW ROUTE
module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
};

// CREATE ROUTE
module.exports.createListing = async (req, res) => {
    try {
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;

        // ✅ Upload image
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);

            newListing.image = {
                url: result.secure_url,
                filename: result.public_id
            };

            fs.unlinkSync(req.file.path);
        }

        // ✅ SAFE Geocoding (NO HANG)
        if (req.body.listing.location) {
            try {
                const response = await geocodingClient.forwardGeocode({
                    query: req.body.listing.location,
                    limit: 1
                }).send();

                if (response.body.features.length > 0) {
                    newListing.geometry = response.body.features[0].geometry;
                } else {
                    console.log("No location found");
                }

            } catch (err) {
                console.log("Geocoding error:", err.message);
            }
        }

        await newListing.save();

        req.flash("success", "New Listing Created!");
        res.redirect("/listings");

    } catch (err) {
        console.log("CREATE ERROR:", err);
        req.flash("error", "Something went wrong!");
        res.redirect("/listings/new");
    }
};

// EDIT ROUTE
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// UPDATE ROUTE
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    // ✅ 🔥 ADD HERE (update coordinates if location changed)
    if (req.body.listing.location) {
        const response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        }).send();

        if (response.body.features.length) {
            listing.geometry = response.body.features[0].geometry;
        }
    }

    // Image update
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);

        listing.image = {
            url: result.secure_url,
            filename: result.public_id
        };

        fs.unlinkSync(req.file.path);
    }

    // ✅ SAVE after all updates
    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

// DELETE ROUTE
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

// SEARCH ROUTE
module.exports.search = async (req, res) => {
    let { q } = req.query;

    if (!q || q.trim() === "") {
        req.flash("error", "Please enter something to search");
        return res.redirect("/listings");
    }

    const allListings = await Listing.find({
        $or: [
            { title: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } }
        ]
    });

    res.render("listings/index.ejs", { allListings });
};
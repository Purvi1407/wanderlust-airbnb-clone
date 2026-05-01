const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: String,
   image: {
    url: {
        type: String,
        default: "https://via.placeholder.com/300"
    },
    filename: String,
},
    price: {
    type: Number,
    min: 0
},
    location: {
    type: String,
    required: true
},
country: {
    type: String,
    required: true
},
    reviews: [
        {
            type: schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
    type: {
        type: String,
        enum: ['Point'],
    },
    coordinates: [Number],
},
    category: {
        type: String,
        enum: ["Beach", "City", "Mountain", "Historic", "Treehouse", "Cabin", "Luxury", "Ski", "Safari"],
        default: "Beach"
    },
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
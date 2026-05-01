const mongoose = require("mongoose");
const schema = mongoose.Schema;

const reviewSchema = new schema ({
    comment: {
    type: String,
    required: true,
    trim: true
},
    rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
},
    createdAt : {
        type:Date,
        default:Date.now
    },
    author: {
        type: schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Review", reviewSchema);
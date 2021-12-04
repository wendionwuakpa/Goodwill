const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClothingItemSchema = new Schema(
    {
        // NOTE: ObjectId for clothing is automatically created

        // type of clothing
        "clothing_type": {
            type: String,
            enum: [
                "Shirt",
                "Pants",
                "Shorts",
                "Jacket",
                "Sweater"
            ],
            required: true
        },

        // date of when clothing was donated
        // don't need to specify date; mongo will automatically make a default when it's created
        "date_uploaded": {
            type: Date,
            required: false,
            default: new Date()
        },

        "date_pickup": {
            type: Date,
            required: false,
            default: null
        },

        // image link of clothing
        "image": {
            type: String,
            required: true,
        },

        // username of donator
        "donator": {
            type: String,
            required: true,
        },

        // title of donation
        "title": {
            type: String,
            required: true
        },

        "condition": {
            type: String,
            enum: [
                "Brand New",
                "Almost New",
                "Used"
            ],
            required: true
        },

        "size": {
            type: String,
            enum: [
                "Extra Small",
                "Small",
                "Medium",
                "Large",
                "Extra Large"
            ],
            required: true
        },

        "brand": {
            type: String,
            required: true,
        },

        "picked_up": {
            type: Boolean,
            required: false,
            default: false
        }
    }
);



// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("ClothingItem", ClothingItemSchema);
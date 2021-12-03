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
        },

        // date of when clothing was donated
        // don't need to specify date; mongo will automatically make a default when it's created
        "date_donated": {
            type: Date,
            required: false,
            default: new Date()
        },

        // date of when clothing was claimed
        // don't need to specify; mongo will automatical set defaul to null
        "date_claimed": {
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

        // boolean indicating if item has been claimed
        // don't need to specify; automatically sets claimed to false when created
        "claimed": {
            type: Boolean,
            required: false,
            default: false
        }
    }
);



// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("ClothingItem", ClothingItemSchema);
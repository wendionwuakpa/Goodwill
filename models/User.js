const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        "username": {
            type: String,
            required: true
        },

        "password": {
            type: String,
            required: true,
        },

        "claimed_clothes": [{
            type: Schema.Types.ObjectId,
            ref: 'ClothingItem',
            required: false,
            default: []
        }],

        "donated_clothes": [{
            type: Schema.Types.ObjectId,
            ref: 'ClothingItem',
            required: false,
            default: []
        }],
    }
);
// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("User", UserSchema);
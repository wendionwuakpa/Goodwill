const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminstratorSchema = new Schema(
    {
        "username": {
            type: "admin",
            required: true
        },

        "password": {
            type: "pass123",
            required: true,
        },

        //we don't need to know what clothes are donated.

        // "donated_clothes": [{
        //     type: Schema.Types.ObjectId,
        //     ref: 'ClothingItem',
        //     required: false,
        //     default: []
        // }],

        //CHANGE
        "registered_users": [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false,
            default: []
        }],


    }
);
// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("Admin", AdminstratorSchema);
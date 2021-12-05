const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminstratorSchema = new Schema(
    {
        "username": {
            type: String,
            required: true,

        },

        "password": {
            type: String,
            required: true,
        },
    }
);
// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("Admin", AdminstratorSchema);
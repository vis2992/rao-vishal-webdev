/**
 * Created by vishalrao on 11/8/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var UserModel = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
        dateCreated: {type: Date, default: Date.now},
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: "user"});
    return UserModel;
};
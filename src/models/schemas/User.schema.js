"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var UserVerifyStatus;
(function (UserVerifyStatus) {
    UserVerifyStatus[UserVerifyStatus["Unverified"] = 0] = "Unverified";
    UserVerifyStatus[UserVerifyStatus["Verified"] = 1] = "Verified";
    UserVerifyStatus[UserVerifyStatus["Banned"] = 2] = "Banned";
})(UserVerifyStatus || (UserVerifyStatus = {}));
var User = /** @class */ (function () {
    function User(user) {
        var date = new Date();
        this._id = user._id || new mongodb_1.ObjectId();
        this.name = user.name || '';
        this.email = user.email;
        this.date_of_birth = user.date_of_birth || date;
        this.password = user.password;
        this.created_at = user.created_at || date;
        this.updated_at = user.updated_at || date;
        this.email_verify_token = user.email_verify_token || '';
        this.forgot_password_token = user.forgot_password_token || '';
        this.verify = user.verify || UserVerifyStatus.Unverified;
        this.bio = user.bio || '';
        this.location = user.location || '';
        this.website = user.website || '';
        this.username = user.username || '';
        this.avatar = user.avatar || '';
        this.cover_photo = user.cover_photo || '';
    }
    return User;
}());
exports["default"] = User;

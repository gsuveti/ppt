/// <reference path="../../../typings/main.d.ts" />

import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
    createdAt: {type: Date, default: Date.now},
    role: {
        type: String,
        default: 'user'
    },
    email: {type: String, lowercase: true},
    hashedPassword: String,
    salt: String,
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    studentID: {type: String, required: true},

    hiredCompany: String,
    hiredCompanyAddress: String,
    hiredContactPerson: String,
    hiredContactPersonEmail: String,

    selfCompany: String,
    selfCompanyAddress: String,
    selfContactPerson: String,
    selfContactPersonPosition: String,
    selfContactPersonEmail: String,

    otherSituation: String,
    otherContactPerson: String,
    otherContactPersonPosition: String,
    otherContactPersonEmail: String,

    otherContactPersonEmail: String,

    cv: Buffer,
    cvName: String,
});

/**
 * Virtuals
 */
// Public profile information
UserSchema
    .virtual('profile')
    .get(function () {
        return {
            'firstName': this.firstName,
            'lastName': this.lastName,
            'studentID': this.studentID,
            'role': this.role
        };
    });

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

/**
 * Validations
 */


// Validate empty email
UserSchema
    .path('email')
    .validate(function (email) {
        return email.length;
    }, 'Email cannot be blank');


// Validate email is not taken
UserSchema
    .path('email')
    .validate(function (value, respond) {
        var self = this;
        this.constructor.findOne({email: value}, function (err, user) {
            if (err) throw err;
            if (user) {
                if (self.id === user.id) return respond(true);
                return respond(false);
            }
            respond(true);
        });
    }, 'The specified email address is already in use.');


var validatePresenceOf = function (value) {
    return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
    .pre('save', function (next) {
        if (!this.isNew) return next();

        if (!validatePresenceOf(this.hashedPassword))
            next(new Error('Invalid password'));
        else
            next();
    });

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function () {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function (password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};

module.exports = mongoose.model('User', UserSchema);


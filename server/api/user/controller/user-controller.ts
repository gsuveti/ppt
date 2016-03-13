/// <reference path="../../../typings/main.d.ts" />

var nodemailer = require('nodemailer');
var User = require('../model/user-model');
var passport = require('passport');
var serverConstants = require('../../../constants/server');
var jwt = require('jsonwebtoken');

export class UserController {
    static validationError = function (res, err) {
        return res.status(422).json(err);
    };

    /**
     * Get list of users
     * restriction: 'admin'
     */
    static index = function (req, res) {
        User.find({}, '-salt -hashedPassword', function (err, users) {
            if (err) return res.status(500).send(err);
            res.status(200).json(users);
        });
    };

    /**
     * Creates a new user
     */
    static create = function (req, res, next) {
        var newUser = new User(req.body);
        newUser.provider = 'local';
        newUser.role = 'user';
        newUser.save(function (err, user) {
            if (err) return UserController.validationError(res, err);
            var token = jwt.sign({_id: user._id}, serverConstants.secrets.session, {expiresInMinutes: 60 * 5});
            res.json({token: token});
        });
    };

    /**
     * Get a single user
     */
    static show = function (req, res, next) {
        var userId = req.params.id;

        User.findById(userId, function (err, user) {
            if (err) return next(err);
            if (!user) return res.status(401).send('Unauthorized');
            res.json(user.profile);
        });
    };

    /**
     * Deletes a user
     * restriction: 'admin'
     */
    static destroy = function (req, res) {
        User.findByIdAndRemove(req.params.id, function (err, user) {
            if (err) return res.status(500).send(err);
            return res.status(204).send('No Content');
        });
    };

    /**
     * Change a users password
     */
    static changePassword = function (req, res, next) {
        var userId = req.user._id;
        var oldPass = String(req.body.oldPassword);
        var newPass = String(req.body.newPassword);

        User.findById(userId, function (err, user) {
            if (user.authenticate(oldPass)) {
                user.password = newPass;
                user.save(function (err) {
                    if (err) return validationError(res, err);
                    res.status(200).send('OK');
                });
            } else {
                res.status(403).send('Forbidden');
            }
        });
    };

// sync customer info
    static link = function (req, res, next) {
        var userId = req.user._id;
        var ingToken = String(req.body.ingToken);

        User.findById(userId, function (err, user) {
            if (err) return next(err);
            if (!user) return res.status(401).send('Unauthorized');
            user.ingToken = ingToken;
            user.save(function (err) {
                if (err) return validationError(res, err);
                res.status(200).json(user);
            });
        });
    };

    /**
     * Get my info
     */
    static me = function (req, res, next) {
        var userId = req.user._id;
        User.findOne({
            _id: userId
        }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
            if (err) return next(err);
            if (!user) return res.status(401).send('Unauthorized');
            res.json(user);
        });
    };

    /**
     * Authentication callback
     */
    static authCallback = function (req, res, next) {
        res.redirect('/');
    };

}

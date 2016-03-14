/// <reference path="../../../typings/main.d.ts" />

var nodemailer = require('nodemailer');
var User = require('../model/user-model');
var passport = require('passport');
var serverConstants = require('../../../constants/server');
var jwt = require('jsonwebtoken');
var multiparty = require('multiparty');
var fs = require('fs');

export class UserController {
    static validationError = function (res, err) {
        return res.status(200).json(err);
    };

    static saveCV = function (req, res) {
        var form = new multiparty.Form();
        var attachments = [];

        form.on('part', function (part) {
            var bufs = [];

            if (!part.filename) { //not a file but a field
                console.log('got field named ' + part.name);
                part.resume();
            }

            if (part.filename) {
                console.log('got file named ' + part.name);
                var data = "";
                part.setEncoding('binary'); //read as binary
                part.on('data', function (d) {
                    data = data + d;
                });
                part.on('end', function () {
                    var userId = req.query.id;
                    User.findById(userId, function (err, user) {
                        if (!err && user) {
                            console.log(user.firstName);
                            user.cv = data;
                            fs.writeFile(part.name, data, function (err) {
                                console.log(err);
                            });


                            user.save(function (err, user) {
                                if (err) {
                                    console.log(err);
                                }
                                console.log(user.firstName);
                            });

                        } else {
                            console.log(err);
                            res.status(200).send('Erroare');
                        }
                    });

                    User.findOneAndUpdate(userId, {cv: data});
                });
            }
        });

        form.on('close', function () {
            res.writeHead(200);
            res.end("File uploaded successfully!");
        });

        form.parse(req);
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

    /**
     * Get my info
     */
    static me = function (req, res, next) {
        var userId = req.user._id;
        console.log(req.user);
        User.findOne({
            _id: userId
        }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
            if (err) return next(err);
            if (!user) return res.status(401).send('Unauthorized');


            fs.writeFile("test-qwerty-image.pdf", user.cv, function (err) {
                console.log(err);
            });


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

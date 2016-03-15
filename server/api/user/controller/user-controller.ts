/// <reference path="../../../typings/main.d.ts" />

var nodemailer = require('nodemailer');
var User = require('../model/user-model');
var Company = require('../../company/model/company-model');
var passport = require('passport');
var serverConstants = require('../../../constants/server');
var jwt = require('jsonwebtoken');
var multiparty = require('multiparty');
var fs = require('fs');
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation

export class UserController {
    static validationError = function (res, err) {
        return res.status(200).json(err);
    };

    static saveNoPractice = function (req, res) {
        var details = req.body.details;
        var userId = req.query.id;

        User.findById(userId, function (err, user) {
            if (err) {
                return validationError(res, err);
            } else {

                user.hiredCompany = details.hiredCompany;
                user.hiredCompanyAddress = details.hiredCompanyAddress;
                user.hiredContactPerson = details.hiredContactPerson;
                user.hiredContactPersonEmail = details.hiredContactPersonEmail;

                user.selfCompany = details.selfCompany;
                user.selfCompanyAddress = details.selfCompanyAddress;
                user.selfContactPerson = details.selfContactPerson;
                user.selfContactPersonPosition = details.selfContactPersonPosition;
                user.selfContactPersonEmail = details.selfContactPersonEmail;

                user.otherSituation = details.otherSituation;
                user.otherContactPerson = details.otherContactPerson;
                user.otherContactPersonPosition = details.otherContactPersonPosition;
                user.otherContactPersonEmail = details.otherContactPersonEmail;

                user.save(function (err, user) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(user.firstName);
                });

                res.status(200);
            }
        });
    }


    static savePractice = function (req, res) {
        var companies = req.body.companies;
        var userId = req.query.id;

        console.log(companies);
        User.findById(userId, function (err, user) {
            if (!err && user) {
                Company.find({
                    '_id': {$in: companies}
                }, function (err, docs) {
                    console.log(docs.length);
                    docs.forEach(function (doc) {
                        if (doc.users.indexOf(user._id) < 0) {
                            doc.users.push(user);
                        }
                        doc.save(function (err, user) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    });
                });
            }
        });
        res.status(200);
    }

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

            //if (user.cvName) {
            //    fs.writeFile(user.cvName, user.cv, function (err) {
            //        console.log(err);
            //    });
            //}

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

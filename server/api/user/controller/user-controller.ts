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
    public static transporter = nodemailer.createTransport('smtps://practica@ligaac.ro:practica2016@smtp.gmail.com');

    static validationError = function (res, err) {
        console.log(err);
        return res.status(200).json({status: "ERROR"});
    };

    static saveNoPractice = function (req, res) {
        var details = req.body.details;
        var userId = req.user._id;

        User.findById(userId, function (err, user) {
            if (err) {
                return UserController.validationError(res, err);
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


                Company.find({
                    'users': userId
                }, function (err, docs) {
                    if (err) {
                        UserController.validationError(res, err);
                    }

                    docs.forEach(function (doc) {
                        var index = doc.users.indexOf(userId);
                        if (index > -1) {
                            doc.users.splice(index, 1);
                            doc.save(function (err, doc) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }
                    });
                });

                user.save(function (err, user) {
                        if (err) {
                            UserController.validationError(res, err);
                        }

                        var mailOptions;
                        if (user.hiredCompany) {
                            mailOptions = {
                                from: 'practica@ligaac.ro', // sender address
                                to: user.email, // list of receivers
                                subject: 'Practica AC', // Subject line
                                html: '<br/><strong>Detalii personale</strong><br/>' +
                                '<p>Nume: ' + user.firstName + ' ' + user.lastName + '</p>' +
                                '<p>Numar matricol: ' + user.studentID + '</p>' +
                                '<br/><strong>Optiune: Sunt angajat</strong><br/>' +
                                '<p>Companie: ' + user.hiredCompany + '</p>' +
                                '<p>Adresa companie: ' + user.hiredCompanyAddress + '</p>' +
                                '<p>Persoana de contact: ' + user.hiredContactPerson + '</p>' +
                                '<p>Email persoana de contact: ' + user.hiredContactPersonEmail + '</p>' +
                                '<br/><p>Va multumim!</p>'
                            };
                        } else if (user.selfCompany) {
                            mailOptions = {
                                from: 'practica@ligaac.ro', // sender address
                                to: user.email, // list of receivers
                                subject: 'Practica AC', // Subject line
                                html: '<br/><strong>Detalii personale</strong><br/>' +
                                '<p>Nume: ' + user.firstName + ' ' + user.lastName + '</p>' +
                                '<p>Numar matricol: ' + user.studentID + '</p>' +
                                '<br/><strong>Optiune:  Solicit loc de pratica propus de mine (din domeniul IT&C) </strong><br/>' +
                                '<p>Companie: ' + user.selfCompany + '</p>' +
                                '<p>Adresa companie: ' + user.selfCompanyAddress + '</p>' +
                                '<p>Persoana de contact: ' + user.selfContactPerson + '</p>' +
                                '<p>Functie persoana de contact: ' + user.selfContactPersonPosition + '</p>' +
                                '<p>Email persoana de contact: ' + user.selfContactPersonEmail + '</p>' +
                                '<br/><p>Va multumim!</p>'
                            };
                        } else if (user.otherSituation) {
                            mailOptions = {
                                from: 'practica@ligaac.ro', // sender address
                                to: user.email, // list of receivers
                                subject: 'Practica AC', // Subject line
                                html: '<br/><strong>Detalii personale</strong><br/>' +
                                '<p>Nume: ' + user.firstName + ' ' + user.lastName + '</p>' +
                                '<p>Numar matricol: ' + user.studentID + '</p>' +
                                '<br/><strong>Optiune:  Alte situatii (Erasmus, Practica in cadrul facultatii, Proiecte POSDRU, Liga AC LABS) </strong><br/>' +
                                '<p>Situatie: ' + user.otherSituation + '</p>' +
                                '<p>Persoana de contact: ' + user.otherContactPerson + '</p>' +
                                '<p>Functie persoana de contact: ' + user.otherContactPersonPosition + '</p>' +
                                '<p>Email persoana de contact: ' + user.otherContactPersonEmail + '</p>' +
                                '<br/><p>Va multumim!</p>'
                            };
                        }

                        if (mailOptions) {
                            UserController.transporter.sendMail(mailOptions, function (err, info) {
                                if (err) {
                                    UserController.validationError(res, err);
                                }
                                else {
                                    //console.log(info);
                                }
                            });
                        }


                    }
                );

                res.status(200).send("OK");
            }
        });
    }


    static
    savePractice = function (req, res) {
        console.log("save practice");
        var companies = req.body.companies;
        var userId = req.user._id;

        User.findById(userId, function (err, user) {
            if (err) {
                UserController.validationError(res, err);
            }
            if (user) {
                user.hiredCompany = undefined;
                user.hiredCompanyAddress = undefined;
                user.hiredContactPerson = undefined;
                user.hiredContactPersonEmail = undefined;

                user.selfCompany = undefined;
                user.selfCompanyAddress = undefined;
                user.selfContactPerson = undefined;
                user.selfContactPersonPosition = undefined;
                user.selfContactPersonEmail = undefined;

                user.otherSituation = undefined;
                user.otherContactPerson = undefined;
                user.otherContactPersonPosition = undefined;
                user.otherContactPersonEmail = undefined;

                user.save(function (err, user) {
                    if (err) {
                        UserController.validationError(res, err);
                    }
                    // add user to selected companies
                    Company.find({
                        //'_id': {$in: companies}
                    }, function (err, docs) {
                        if (err) {
                            UserController.validationError(res, err);
                        }
                        var companiesList = '';
                        var prefix = '';
                        docs.forEach(function (doc) {
                            companiesList += prefix + doc.name;
                            prefix = ", ";

                            if (companies.indexOf(String(doc._id)) < 0) {
                                // remove old options
                                var index = doc.users.indexOf(user._id);
                                if (index > -1) {
                                    doc.users.splice(index, 1);
                                    doc.save(function (err, doc) {
                                        if (err) {
                                            console.log(err);
                                        }
                                    });
                                }
                            }
                            else {
                                if (doc.users.indexOf(user._id) < 0) {
                                    doc.users.push(user);
                                    doc.save(function (err, doc) {
                                        if (err) {
                                            console.log(err);
                                        }
                                    });
                                }
                            }
                        });

                        var mailOptions = {
                            from: 'practica@ligaac.ro', // sender address
                            to: user.email, // list of receivers
                            subject: 'Practica AC', // Subject line
                            html: '<br/><strong>Detalii personale</strong><br/>' +
                            '<p>Nume: ' + user.firstName + ' ' + user.lastName + '</p>' +
                            '<p>Numar matricol: ' + user.studentID + '</p>' +
                            '<br/><strong>Optiune: Aplic la una dintre companiile participante</strong><br/>' +
                            '<p>Companii selectate: ' + companiesList + '</p>' +
                            '<br/><p>Va multumim!</p>'
                        };
                        UserController.transporter.sendMail(mailOptions, function (err, info) {
                            if (err) {
                                UserController.validationError(res, err);
                            }
                            else {
                                //console.log(info);
                            }
                        });


                    });
                });
            } else {
                return res.status(200).json({status: "UNAUTHORIZED"});
            }
        });
        res.status(200).json({status: "OK"});
    }


    static create = function (req, res, next) {
        var newUser = new User(req.body);
        newUser.provider = 'local';
        newUser.role = 'user';

        newUser.save(function (err, user) {
            if (err) {
                if (err.errors.email) {
                    res.status(200).json({status: "EMAIL"});
                }
                if (err.errors.studentID) {
                    res.status(200).json({status: "STUDENT_ID"});
                }
                return UserController.validationError(res, err);
            }
            var token = jwt.sign({_id: user._id}, serverConstants.secrets.session, {expiresInMinutes: 60 * 5});
            res.json({token: token});
        });
    };

    static update = function (req, res, next) {
        var userId = req.user._id;
        var newUser = req.body;
        User.findOne({
            _id: userId
        }, '-salt -hashedPassword -cv', function (err, user) { // don't ever give out the password or salt
            if (err) return UserController.validationError(res, err);
            if (!user) return res.status(200).json({status: "UNAUTHORIZED"});

            user.firstName = newUser.firstName;
            user.lastName = newUser.lastName;
            user.email = newUser.email;
            user.studentID = newUser.studentID;
            user.year = newUser.year;

            user.save(function (err, user) {
                if (err) return UserController.validationError(res, err);
            });
        });

        res.status(200).json({status: "OK"});
    };


    static
    me = function (req, res, next) {
        var userId = req.user._id;
        User.findOne({
            _id: userId
        }, '-salt -hashedPassword -cv', function (err, user) { // don't ever give out the password or salt
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


    static
    getCv = function (req, res, next) {
        var userId = req.query.id;
        User.findOne({
            _id: userId
        }, function (err, user) { // don't ever give out the password or salt
            if (err) return UserController.validationError(res, err);
            if (!user) return res.status(200).json({status: "UNAUTHORIZED"});
            res.writeHead(200, {'Content-Type': user.cvMimetype});
            res.end(user.cv);
        });
    };

    /**
     * Authentication callback
     */
    static
    authCallback = function (req, res, next) {
        res.redirect('/');
    };

}

/// <reference path="../../../typings/main.d.ts" />

var nodemailer = require('nodemailer');
var User = require('../model/user-model');
var Student = require('../model/student-model');
var Company = require('../../company/model/company-model');
var passport = require('passport');
var serverConstants = require('../../../constants/server');
var jwt = require('jsonwebtoken');
var multiparty = require('multiparty');
var fs = require('fs');
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
var randomstring = require("randomstring");
var json2csv = require('json2csv');
var _ = require('lodash');

export class UserController {
    public static transporter = nodemailer.createTransport('smtps://practica@ligaac.ro:practica2016@smtp.gmail.com');

    static validationError = function (res, err) {
        console.log(err);
        return res.status(200).json({status: "ERROR"});
    };

    static saveNoPractice = function (req, res) {

        var deleteOption = req.query.delete_option;

        var details = req.body.details;
        var userId = req.user._id;

        User.findById(userId,'-salt -hashedPassword -cv', function (err, user) {
            if (err) {
                return UserController.validationError(res, err);
            } else {
                if (details.hiredCompany) {
                    user.hiredCompany = details.hiredCompany;
                    user.hiredCompanyAddress = details.hiredCompanyAddress;
                    user.hiredContactPerson = details.hiredContactPerson;
                    user.hiredContactPersonEmail = details.hiredContactPersonEmail;
                }
                if (details.selfCompany) {
                    user.selfCompany = details.selfCompany;
                    user.selfCompanyAddress = details.selfCompanyAddress;
                    user.selfContactPerson = details.selfContactPerson;
                    user.selfContactPersonPosition = details.selfContactPersonPosition;
                    user.selfContactPersonEmail = details.selfContactPersonEmail;
                }
                if (details.otherSituation) {
                    user.otherSituation = details.otherSituation;
                    user.otherContactPerson = details.otherContactPerson;
                    user.otherContactPersonPosition = details.otherContactPersonPosition;
                    user.otherContactPersonEmail = details.otherContactPersonEmail;
                }


                if (deleteOption === 'hiredCompany') {
                    user.hiredCompany = undefined;
                    user.hiredCompanyAddress = undefined;
                    user.hiredContactPerson = undefined;
                    user.hiredContactPersonEmail = undefined;
                }

                if (deleteOption === 'selfCompany') {
                    user.selfCompany = undefined;
                    user.selfCompanyAddress = undefined;
                    user.selfContactPerson = undefined;
                    user.selfContactPersonPosition = undefined;
                    user.selfContactPersonEmail = undefined;
                }

                if (deleteOption === 'otherSituation') {
                    user.otherSituation = undefined;
                    user.otherContactPerson = undefined;
                    user.otherContactPersonPosition = undefined;
                    user.otherContactPersonEmail = undefined;
                }


                if (deleteOption === 'company') {
                    Company.find({
                        'users': userId
                    }, function (err, docs) {
                        if (err) {
                            return UserController.validationError(res, err);
                        }

                        docs.forEach(function (doc) {
                            var index = doc.users.indexOf(userId);
                            if (index > -1) {
                                doc.users.splice(index, 1);
                                doc.save(function (err, doc) {
                                    if (err) {
                                        return UserController.validationError(res, err);
                                    }
                                });
                            }
                        });
                    });
                }

                user.save(function (err, user) {
                        if (err) {
                            return UserController.validationError(res, err);
                        }

                        return UserController.sendMail(user, res);
                    }
                );
            }
        });
    }


    static
    savePractice = function (req, res) {
        var companies = req.body.companies;
        var userId = req.user._id;

        User.findById(userId,'-salt -hashedPassword -cv', function (err, user) {
            if (err) {
                return UserController.validationError(res, err);
            }
            if (user) {
                user.save(function (err, user) {
                    if (err) {
                        return UserController.validationError(res, err);
                    }
                    // add user to selected companies
                    Company.find({
                        //'_id': {$in: companies}
                    }, function (err, docs) {
                        if (err) {
                            return UserController.validationError(res, err);
                        }
                        var companiesList = '';
                        var prefix = '';
                        docs.forEach(function (doc) {


                            if (companies.indexOf(String(doc._id)) < 0) {
                                // remove old options
                                var index = doc.users.indexOf(user._id);
                                if (index > -1) {
                                    doc.users.splice(index, 1);
                                    doc.save(function (err, doc) {
                                        if (err) {
                                            return UserController.validationError(res, err);
                                        }
                                    });
                                }
                            }
                            else {
                                companiesList += prefix + doc.name;
                                prefix = ", ";

                                if (doc.users.indexOf(user._id) < 0) {
                                    doc.users.push(user);
                                    doc.save(function (err, doc) {
                                        if (err) {
                                            return UserController.validationError(res, err);
                                        }
                                    });
                                }
                            }
                        });

                        return UserController.sendMail(user, res);

                    });
                });
            } else {
                return res.status(200).json({status: "UNAUTHORIZED"});
            }
        });
    }


    static create = function (req, res, next) {
        var newUser = new User(req.body);
        newUser.provider = 'local';
        newUser.role = 'user';

        newUser.save(function (err, user) {
            if (err) {
                if (err.errors.email) {
                    return res.status(200).json({status: "EMAIL"});
                }
                if (err.errors.studentID) {
                    return res.status(200).json({status: "STUDENT_ID"});
                }
                else {
                    return UserController.validationError(res, err);
                }
            }
            else {
                var token = jwt.sign({_id: user._id}, serverConstants.secrets.session, {expiresInMinutes: 60 * 5});
                res.json({token: token});
            }
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
                if (err) {
                    return UserController.validationError(res, err);
                }
                else {
                    UserController.sendMail(user,res);
                }
            });
        });


    };


    static
    me = function (req, res, next) {
        var userId = req.user._id;
        User.findOne({
            _id: userId
        }, '-salt -hashedPassword -cv', function (err, user) { // don't ever give out the password or salt
            if (err) return next(err);
            if (!user) return res.status(200).json({status: "UNAUTHORIZED"});

            //if (user.cvName) {
            //    fs.writeFile(user.cvName, user.cv, function (err) {
            //        console.log(err);
            //    });
            //}
            res.json(user);
        });
    };

    static
    requestResetPassword = function (req, res, next) {
        var email = req.params.email;
        User.findOne({
            email: email
        }, '-salt -hashedPassword -cv', function (err, user) { // don't ever give out the password or salt
            if (err) return UserController.validationError(res, err);
            if (!user) {
                return res.status(200).json({status: "EMAIL"});
            }
            else {
                user.resetPasswordToken = randomstring.generate();
                var resetPasswordExpiryDate = new Date();
                resetPasswordExpiryDate.setDate(resetPasswordExpiryDate.getDate() + 1);
                user.resetPasswordExpiryDate = resetPasswordExpiryDate;


                user.save(function (err, user) {
                    if (err) {
                        return UserController.validationError(res, err);
                    }
                    else {
                        var mailOptions = {
                            from: 'practica@ligaac.ro', // sender address
                            to: user.email, // list of receivers
                            subject: 'Resetare parola - Practica AC', // Subject line
                            html: '<p>Pentru a reseta parola acceseaza linkul de mai jos:</p>' +
                            '<br/>' +
                            '<a href="http://practica.ligaac.ro/reset-password/' + user.resetPasswordToken + '/' + user.email + '">Reseteaza parola!</a>'

                        };
                        UserController.transporter.sendMail(mailOptions, function (err, info) {
                            if (err) {
                                return UserController.validationError(res, err);
                            }
                            else {
                                return res.status(200).json({status: "OK"});
                            }
                        });
                    }
                });
            }

        });
    };


    static
    resetPassword = function (req, res, next) {
        var token = req.params.token;
        var user = req.body;
        var email = user.email;
        var password = user.password;

        User.findOne({
            email: email
        }, '-salt -hashedPassword -cv', function (err, user) { // don't ever give out the password or salt
            if (err) return UserController.validationError(res, err);
            if (!user) {
                return res.status(200).json({status: "UNAUTHORIZED"});
            }
            else {
                var now = new Date();
                if (user.resetPasswordToken && user.resetPasswordToken === token && now < user.resetPasswordExpiryDate) {
                    user.password = password;
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpiryDate = undefined;

                    user.save(function (err, user) {
                        if (err) {
                            return UserController.validationError(res, err);
                        }
                        else {
                            return res.status(200).json({status: "OK"});
                        }
                    });
                }
                else {
                    return res.status(200).json({status: "TOKEN"});
                }
            }

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


    static
    overall = function (req, res, next) {
        var fields = ['firstName','lastName', 'email', 'year', 'studentID','hiredCompany', 'selfCompany','otherSituation', 'company' ];
        var fieldNames = ['Prenume','Nume', 'Email', 'An', 'Numar Matricol', 'Angajat', 'Propunere', 'Alte situatii', 'Aplica la companii'];


        Company.find({},'users', function (err, docs) {
            if (err) {
                return UserController.validationError(res, err);
            }
            var companyUsers = '';
            if (docs && docs.length > 0) {
                companyUsers = _.reduce(docs, function (companyUsers, doc) {
                    return companyUsers+ doc.users.toString();
                }, '');
            }


            User.find({},'-salt -hashedPassword -cv',
                function (err, users) { // don't ever give out the password or salt
                    if (err) return UserController.validationError(res, err);
                    users.forEach(user=> {
                        if (user.hiredCompany) {
                            user.hiredCompany = 'DA';
                        } else {
                            user.hiredCompany = '';
                        }

                        if (user.selfCompany) {
                            user.selfCompany = 'DA';
                        } else {
                            user.selfCompany = '';
                        }

                        if (user.otherSituation) {
                            user.otherSituation = 'DA';
                        } else {
                            user.otherSituation = '';
                        }
                        if(companyUsers.indexOf(user._id.toString()) > -1){
                            user['company']='DA';
                        }else{
                            user['company']='';
                        }
                    });

                    json2csv({ data: users, fields: fields , fieldNames:fieldNames}, function(err, csv) {
                        if (err) console.log(err);
                        res.writeHead(200, {'Content-Type': 'text/csv'});
                        res.end(csv);
                    });
                });
        });
    };


    static
    hired = function (req, res, next) {
        var fields = ['firstName','lastName', 'email', 'year', 'studentID','hiredCompany', 'hiredCompanyAddress','hiredContactPerson', 'hiredContactPersonEmail' ];
        var fieldNames = ['Prenume','Nume', 'Email', 'An', 'Numar Matricol', 'Companie', 'Adresa companie', 'Persoana de contact', 'Email persoana de contact'];



            User.find({
                    hiredCompany:{$exists:true}
            },'-salt -hashedPassword -cv',
                function (err, users) { // don't ever give out the password or salt
                    if (err) return UserController.validationError(res, err);

                    json2csv({ data: users, fields: fields , fieldNames:fieldNames}, function(err, csv) {
                        if (err) console.log(err);
                        res.writeHead(200, {'Content-Type': 'text/csv'});
                        res.end(csv);
                    });
                });
    };


    static
    self = function (req, res, next) {
        var fields = ['firstName','lastName', 'email', 'year', 'studentID','selfCompany', 'selfCompanyAddress','selfContactPerson', 'selfContactPersonPosition', 'selfContactPersonEmail' ];
        var fieldNames = ['Prenume','Nume', 'Email', 'An', 'Numar Matricol', 'Companie', 'Adresa companie', 'Persoana de contact','Pozitie persoana de contact', 'Email persoana de contact'];



        User.find({
                selfCompany:{$exists:true}
            },'-salt -hashedPassword -cv',
            function (err, users) { // don't ever give out the password or salt
                if (err) return UserController.validationError(res, err);

                json2csv({ data: users, fields: fields , fieldNames:fieldNames}, function(err, csv) {
                    if (err) console.log(err);
                    res.writeHead(200, {'Content-Type': 'text/csv'});
                    res.end(csv);
                });
            });
    };

    static
    other = function (req, res, next) {
        var fields = ['firstName','lastName', 'email', 'year', 'studentID','otherSituation', 'otherContactPerson','otherContactPerson', 'otherContactPerson' ];
        var fieldNames = ['Prenume','Nume', 'Email', 'An', 'Numar Matricol', 'Situatie', 'Persoana de contact','Pozitie persoana de contact', 'Email persoana de contact'];



        User.find({
                otherSituation:{$exists:true}
            },'-salt -hashedPassword -cv',
            function (err, users) { // don't ever give out the password or salt
                if (err) return UserController.validationError(res, err);

                json2csv({ data: users, fields: fields , fieldNames:fieldNames}, function(err, csv) {
                    if (err) console.log(err);
                    res.writeHead(200, {'Content-Type': 'text/csv'});
                    res.end(csv);
                });
            });
    };

    static
    noOption = function (req, res, next) {
        var fields = [ 'name', 'year', 'studentID' ];
        var fieldNames = ['Nume', 'An', 'Numar Matricol'];



        User.find({},'studentID',
            function (err, users) { // don't ever give out the password or salt
                if (err) return UserController.validationError(res, err);
                var usersIDs = [];
                users.forEach(user=> {
                   usersIDs.push(user.studentID);
                });

                Student.find({},
                    function (err, students) { // don't ever give out the password or salt
                        if (err) return UserController.validationError(res, err);
                        var noOptionStudents= [];
                        students.forEach(student=> {
                            if(usersIDs.indexOf(student.studentID)<0 && usersIDs.indexOf(student.studentID.replace(/\D/g,''))<0){
                                noOptionStudents.push(student);
                            }
                        });

                        json2csv({ data: noOptionStudents, fields: fields , fieldNames:fieldNames}, function(err, csv) {
                            if (err) console.log(err);
                            res.writeHead(200, {'Content-Type': 'text/csv'});
                            res.end(csv);
                        });
                    });


            });
    };

    /**
     * Authentication callback
     */
    static
    authCallback = function (req, res, next) {
        res.redirect('/');
    };

    static sendMail(user, res) {
        var selectedOptions= [];
        var html = '<br/>' +
            '<strong>Detalii personale</strong>' +
            '<br/>' +
            '<p>Nume: ' + user.firstName + ' ' + user.lastName + '</p>' +
            '<p>Numar matricol: ' + user.studentID + '</p>' +
            '<p>Anul de studiu: ' + user.year + '</p>' +
            '<br/>';


        if (user.hiredCompany) {
            selectedOptions.push(
                '<br/><strong>Sunt angajat</strong><br/>' +
                '<p>Companie: ' + user.hiredCompany + '</p>' +
                '<p>Adresa companie: ' + user.hiredCompanyAddress + '</p>' +
                '<p>Persoana de contact: ' + user.hiredContactPerson + '</p>' +
                '<p>Email persoana de contact: ' + user.hiredContactPersonEmail + '</p>' +
                '<br/>'
            );
        }
        if (user.selfCompany) {
            selectedOptions.push(
                '<br/><strong>Solicit loc de pratica propus de mine (din domeniul IT&C) </strong><br/>' +
                '<p>Companie: ' + user.selfCompany + '</p>' +
                '<p>Adresa companie: ' + user.selfCompanyAddress + '</p>' +
                '<p>Persoana de contact: ' + user.selfContactPerson + '</p>' +
                '<p>Functie persoana de contact: ' + user.selfContactPersonPosition + '</p>' +
                '<p>Email persoana de contact: ' + user.selfContactPersonEmail + '</p>' +
                '<br/>'
            );
        }

        if (user.otherSituation) {
            selectedOptions.push(
                '<br/><strong>Alte situatii (Erasmus, Practica in cadrul facultatii, Proiecte POSDRU, Liga AC LABS) </strong><br/>' +
                '<p>Situatie: ' + user.otherSituation + '</p>' +
                '<p>Persoana de contact: ' + user.otherContactPerson + '</p>' +
                '<p>Functie persoana de contact: ' + user.otherContactPersonPosition + '</p>' +
                '<p>Email persoana de contact: ' + user.otherContactPersonEmail + '</p>' +
                '<br/>'
        );
        }

        Company.find({
            'users': user._id
        }, function (err, docs) {
            if (err) {
                return UserController.validationError(res, err);
            }
            var companiesList = '';
            var prefix = '';
            docs.forEach(function (doc) {
                companiesList += prefix + doc.name;
                prefix = ", ";
            });

            if (companiesList) {
                selectedOptions.push('<br/><strong>Aplic la una dintre companiile participante</strong><br/>' +
                    '<p>Companii selectate: ' + companiesList + '</p>');
            }
            if(selectedOptions && selectedOptions.length>0){
                html +='<p>Optiuni alese:</p>';
                selectedOptions.forEach((option)=>{
                    html+=option;
                });
            }
            else{
                html += '<p>Nu ai ales optiuni de practica!</p>';
            }


            html += '<br><p>Va multumim!</p>';

            var mailOptions = {
                from: 'practica@ligaac.ro', // sender address
                to: user.email, // list of receivers
                subject: 'Practica AC', // Subject line
                html: html
            };

            UserController.transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    return UserController.validationError(res, err);
                }
                else {
                    return res.status(200).json({status: "OK"});
                }
            });
        });


    }
}

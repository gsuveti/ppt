/// <reference path="../../../typings/main.d.ts" />

var SummerPracticeProgram = require('../model/summerPracticeProgram-model');
var Company = require('../model/company-model');
var json2csv = require('json2csv');
var sanitize = require("sanitize-filename");
var _ = require("lodash");

export class CompanyController {
    static getAll = function (req, res, next) {
        Company.find({}).populate('summerPracticePrograms').exec(function (err, companies) {
            if (err) return res.status(500).send(err);
            res.status(200).json(companies);
        });
    };

    static getAllNoPrograms = function (req, res) {
        Company.find({}).exec(function (err, companies) {
            if (err) return res.status(500).send(err);
            res.status(200).json(companies);
        });
    };

    static create = function (req, res) {

        var company = req.body;

        SummerPracticeProgram.collection.insert(company.summerPracticePrograms, function (err, data) {
            if (err) {
                res.status(200).json({status: 'error', message: err});
            } else {
                company.summerPracticePrograms = data.insertedIds;
                var newCompany = new Company(company);

                newCompany.save(function (error, savedCompany) {
                    if (err) {
                        res.status(200).json({status: 'error', message: err});
                    }
                    res.json({status: 'ok', message: savedCompany});
                });

            }
        });
    };

    static update = function (req, res) {
        var companyId = req.params.id
        var newCompany = req.body;

        Company.findOne({
            _id: companyId
        }, function (err, company) { // don't ever give out the password or salt
            if (err) {
                res.status(200).json({status: 'error', message: err});
            }
            if (company && newCompany && newCompany.summerPracticePrograms) {
                SummerPracticeProgram.find({'_id': {$in: company.summerPracticePrograms}}).remove(function (err) {
                    if (err) {
                        res.status(200).json({status: 'error', message: err});
                    }
                });
                SummerPracticeProgram.collection.insert(newCompany.summerPracticePrograms, function (err, data) {
                    if (err) {
                        res.status(200).json({status: 'error', message: err});
                    } else {
                        company.name = newCompany.name;
                        company.description = newCompany.description;
                        company.web = newCompany.web;
                        company.summerPracticePrograms = data.insertedIds;
                        company.save(function (error, savedCompany) {
                            res.json({status: 'ok', message: savedCompany});
                        });

                    }
                });
            }
        });
    };

    static results = function (req, res) {
        var resultsLink = req.params.resultsLink
        var csv = req.query.csv;

        Company.find({resultsLink: resultsLink}, 'name users')
            .populate('users', '_id firstName lastName email year')
            .exec(function (err, companies) { // don't ever give out the password or salt
                if (err) {
                    return res.status(200).json({status: 'error', message: err});
                }
                var company = companies[0];
                company.users = _.sortBy(company.users, ['year','lastName','firstName']);
                if (csv) {

                    company.users.forEach(user=> {
                        user.cvLink = 'practica.ligaac.ro/user/show-cv?id=' + user._id;
                    });

                    json2csv({
                        data: company.users,
                        fields: ['firstName', 'lastName', 'year', 'email', 'cvLink'],
                        fieldNames: ['Prenume', 'Nume', 'An', 'Email', 'CV']
                    }, function (err, csv) {
                        if (err) console.log(err);
                        res.writeHead(200, {'Content-Type': 'text/csv','Content-Disposition': 'attachment; filename="'+sanitize(company.name)+'.csv"',});
                        return res.end(csv);
                    });
                }
                else {
                    return res.status(200).json({status: 'OK', data: company});
                }

            });
    };

}

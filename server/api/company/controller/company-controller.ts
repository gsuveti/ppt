/// <reference path="../../../typings/main.d.ts" />

var Company = require('../model/company-model');

export class CompanyController {
    static getAll = function (req, res) {
        Company.find({}).populate('summerPracticePrograms').exec(function (err, companies) {
            if (err) return res.status(500).send(err);
            res.status(200).json(companies);
        });
    };
}

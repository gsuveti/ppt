/// <reference path="../typings/main.d.ts" />

"use strict";

import * as dbConst from '../constants/db.json';
var Company = require('../api/company/model/company-model');
var SummerPracticeProgram = require('../api/company/model/summerPracticeProgram-model');
var serverConstants = require('../constants/server.json');
var q = require('q');

export class SeedConfig {

    static init():void {

        var companies = [
            {
                name: "irian",
                description: "irian e tare",
                web: "www.irian.at",
                summerPracticePrograms: [
                    {
                        name: "practica 1",
                        contactPerson: "cristi",
                        contactPersonTitle: "manager",
                        contactPersonEmail: "cristi@gmail.com",
                        numberOfStudents: "12",
                        period: "12.06-13.07",
                        description: "nu facem nimic",
                        requirements: "sa nu fii prost"
                    },
                    {
                        name: "practica 2",
                        contactPerson: "cristi",
                        contactPersonTitle: "manager",
                        contactPersonEmail: "cristi@gmail.com",
                        numberOfStudents: "12",
                        period: "12.06-13.07",
                        description: "nu facem nimic",
                        requirements: "sa nu fii prost"
                    }
                ]
            }
        ];

        //companies.forEach(company => {
        //    console.log(company);
        //    console.log(company.summerPracticePrograms);
        //    var newCompany = new Company({
        //        name: company.name,
        //        description: company.description,
        //        web: company.web
        //    });
        //    newCompany.save(function (err, savedCompany) {
        //        if (err) {
        //            console.log(error);
        //
        //        }
        //        else {
        //            company.summerPracticePrograms.forEach(program => {
        //                program.company = savedCompany._id;
        //                SummerPracticeProgram.create(program);
        //            });
        //        }
        //    });
        //
        //});
        //

        Company.remove({}, function (err) {
            SummerPracticeProgram.remove({}, function (err) {
                companies.forEach(company => {
                    SummerPracticeProgram.collection.insert(company.summerPracticePrograms, function (err, data) {
                        if (err) {
                            console.log(error);
                        } else {
                            var newCompany = new Company({
                                name: company.name,
                                description: company.description,
                                web: company.web,
                                summerPracticePrograms: data.insertedIds
                            });
                            newCompany.save(function (error, savedCompany) {
                                console.log(error);
                            });

                        }
                    });
                });
            });
        });


    }
}


/// <reference path="../../../typings/main.d.ts" />

import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

var SummerPracticeProgramSchema = new Schema({
    createdAt: {type: Date, default: Date.now},
    name: {type: String, required: true},
    contactPerson: {type: String, required: true},
    contactPersonTitle: {type: String, required: false},
    contactPersonEmail: {type: String, required: false},
    numberOfStudents: {type: String, required: false},
    period: {type: String, required: false},
    description: {type: String, required: false},
    requirements: {type: String, required: false},
    isPaid: {type: String, required: false},
});

module.exports = mongoose.model('summer-practice-program', SummerPracticeProgramSchema);


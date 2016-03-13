/// <reference path="../../../typings/main.d.ts" />

import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

var SummerPracticeProgramSchema = new Schema({
    createdAt: {type: Date, default: Date.now},
    name: {type: String, required: true},
    contactPerson: {type: String, required: true},
    contactPersonTitle: {type: String, required: true},
    contactPersonEmail: {type: String, required: true},
    numberOfStudents: {type: String, required: true},
    period: {type: String, required: true},
    description: {type: String, required: true},
    requirements: {type: String, required: true},
});

module.exports = mongoose.model('summer-practice-program', SummerPracticeProgramSchema);


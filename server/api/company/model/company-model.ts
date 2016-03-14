/// <reference path="../../../typings/main.d.ts" />

import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;
var SummerPracticeProgram = require('./summerPracticeProgram-model');

var CompanySchema = new Schema({
    createdAt: {type: Date, default: Date.now},
    name: {type: String, required: true},
    description: {type: String, required: false},
    web: {type: String, required: false, trim: true},
    summerPracticePrograms: [{type: Schema.Types.ObjectId, ref: 'summer-practice-program'}],
});

module.exports = mongoose.model('company', CompanySchema);


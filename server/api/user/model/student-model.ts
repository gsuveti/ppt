/// <reference path="../../../typings/main.d.ts" />

import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    name: {type: String, required: true},
    year: {type: String, required: true},
    studentID: {type: String, required: true},

});

module.exports = mongoose.model('Students', StudentSchema);


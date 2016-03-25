/// <reference path="../../../typings/main.d.ts" />

import {Router} from "express";
"use strict";

import {CompanyController} from '../controller/company-controller';
import {AuthService} from "../../../auth/service/auth-service";
var express = require('express');

export class CompanyRoutes {

    static init():Router {
        var router = express.Router();

        router
            .route('/')
            .get(CompanyController.getAll);

        router
            .route('/')
            .post(CompanyController.create);

        router
            .route('/light')
            .get(CompanyController.getAllNoPrograms);

        router
            .route('/:id')
            .post(CompanyController.update);


        return router;
    }
}

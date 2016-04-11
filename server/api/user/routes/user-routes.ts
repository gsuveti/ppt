/// <reference path="../../../typings/main.d.ts" />

import {Router} from "express";
"use strict";

var User = require('../model/user-model');
import {UserController} from '../controller/user-controller';
import {AuthService} from "../../../auth/service/auth-service";
var express = require('express');
var multer = require('multer')
var fs = require('fs')
var storage = multer.memoryStorage()
var upload = multer({storage: storage})

export class UserRoutes {

    static init():Router {
        var router = express.Router();

        router
            .route('/overall')
            .get(UserController.overall);

        router
            .route('/overall/hired')
            .get(UserController.hired);

        router
            .route('/overall/self')
            .get(UserController.self);

        router
            .route('/overall/other')
            .get(UserController.other);

        router
            .route('/overall/no-option')
            .get(UserController.noOption);


        router
            .route('/me')
            .get(AuthService.isAuthenticated(), UserController.me);

        router
            .route('/show-cv')
            .get(UserController.getCv);


        router
            .route('/update')
            .post(AuthService.isAuthenticated(), UserController.update);

        router
            .route('/request-reset-password/:email')
            .post(UserController.requestResetPassword);

        router
            .route('/reset-password/:token')
            .post(UserController.resetPassword);

        router
            .route('/')
            .post(UserController.create);


        router
            .route('/cv')
            .post(AuthService.isAuthenticated(), upload.any(), function (req, res, next) {
                var fileBuffer = req.files[0].buffer;
                var fileName = req.files[0].originalname;
                var fileMimetype = req.files[0].mimetype;

                //fs.writeFile(fileName, fileBuffer, function (err) {
                //    console.log(err);
                //});

                User.findById(req.user._id, function (err, user) {
                    if (err) res.status(200).json({status: "ERROR"});
                    if (!user) return res.status(200).json({status: "UNAUTHORIZED"});

                    user.cv = fileBuffer;
                    user.cvName = fileName;
                    user.cvMimetype = fileMimetype;
                    user.save(function (err, user) {
                        if (err) res.status(200).json({status: "ERROR"});
                    });
                });

                res.status(200).json({status: "OK"});
            });

        router
            .route('/no-practice')
            .post(AuthService.isAuthenticated(), UserController.saveNoPractice);

        router
            .route('/practice')
            .post(AuthService.isAuthenticated(), UserController.savePractice);

        return router;
    }
}

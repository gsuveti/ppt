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
            .route('/me')
            .get(AuthService.isAuthenticated(), UserController.me);

        router
            .route('/:id/password')
            .put(AuthService.isAuthenticated(), UserController.changePassword);

        router
            .route('/:id')
            .get(AuthService.isAuthenticated(), UserController.show);

        router
            .route('/')
            .post(UserController.create);

        router
            .route('/cv')
            .post(upload.any(), function (req, res, next) {
                var fileBuffer = req.files[0].buffer;
                var fileName = req.files[0].originalname;

                //fs.writeFile(fileName, fileBuffer, function (err) {
                //    console.log(err);
                //});

                User.findById(req.query.id, function (err, user) {
                    if (!err && user) {
                        user.cv = fileBuffer;
                        user.cvName = fileName;
                        user.save(function (err, user) {
                            if (err) {
                                console.log(err);
                            }
                            console.log(user.firstName);
                        });

                    } else {
                        console.log(err);
                        res.status(200);
                    }
                });

                res.status(200);
            });

        router
            .route('/no-practice')
            .post(UserController.saveNoPractice);

        router
            .route('/practice')
            .post(UserController.savePractice);

        return router;
    }
}

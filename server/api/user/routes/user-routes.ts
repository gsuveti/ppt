/// <reference path="../../../typings/main.d.ts" />

import {Router} from "express";
"use strict";

import {UserController} from '../controller/user-controller';
import {AuthService} from "../../../auth/service/auth-service";
var express = require('express');

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
            .post(UserController.saveCV);

        return router;
    }
}

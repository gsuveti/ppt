/// <reference path="../../typings/main.d.ts" />

"use strict";

import {AuthController} from '../controller/auth-controller';
import {AuthService} from '../service/auth-service';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var User = require('../../api/user/model/user-model');

export class AuthRoutes {
    static init() {
        const router = express.Router();

        passport.use(new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password' // this is the virtual field on the model
            },
            function (email, password, done) {
                User.findOne({
                    email: email.toLowerCase()
                }, function (err, user) {
                    if (err) return done(err);

                    if (!user) {
                        return done(null, false, {message: 'EMAIL'});
                    }
                    if (!user.authenticate(password)) {
                        return done(null, false, {message: 'PASSWORD'});
                    }
                    return done(null, user);
                });
            }
        ));

        router
            .route('/local')
            .post(function (req, res, next) {
                passport.authenticate('local', function (err, user, info) {
                    if (err) return res.status(200).json({status: "ERROR"});
                    if (info) return res.status(200).json({status: info.message});
                    if (!user) return res.status(200).json({status: 'ERROR'});

                    var token = AuthService.signToken(user._id, user.role);
                    res.json({token: token});
                })(req, res, next)
            });
        return router;
    }
}

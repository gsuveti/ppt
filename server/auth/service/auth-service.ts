/// <reference path="../../typings/main.d.ts" />

"use strict";
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../../api/user/model/user-model');
var secretSession = 'ppt-secret';
var validateJwt = expressJwt({secret: secretSession});

export class AuthService {
    /**
     * Attaches the user object to the request if authenticated
     * Otherwise returns 403
     */
    static isAuthenticated() {


        return compose()
        // Validate jwt
            .use(function (req, res, next) {
                // allow access_token to be passed through query parameter as well
                if (req.query && req.query.hasOwnProperty('access_token')) {
                    req.headers.authorization = 'Bearer ' + req.query.access_token;
                }
                validateJwt(req, res, next);
            })
            // Attach user to request
            .use(function (req, res, next) {
                User.findById(req.user._id, function (err, user) {
                    if (err) return next(err);
                    if (!user) return res.status(200).send('Unauthorized');
                    req.user = user;
                    next();
                });
            });
    }

    /**
     * Checks if the user role meets the minimum requirements of the route
     */
    static hasRole(roleRequired) {
        if (!roleRequired) throw new Error('Required role needs to be set');

        return compose()
            .use(isAuthenticated())
            .use(function meetsRequirements(req, res, next) {
                if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
                    next();
                }
                else {
                    res.status(403).send('Forbidden');
                }
            });
    }

    /**
     * Returns a jwt token signed by the app secret
     */
    static signToken(id) {
        return jwt.sign({_id: id}, secretSession, {expiresInMinutes: 60 * 5});
    }

    /**
     * Set token cookie directly for oAuth strategies
     */
    static setTokenCookie(req, res) {
        if (!req.user) return res.status(404).json({message: 'Something went wrong, please try again.'});
        var token = signToken(req.user._id, req.user.role);
        res.cookie('token', JSON.stringify(token));
        res.redirect('/');
    }
}

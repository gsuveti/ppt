/// <reference path="../typings/main.d.ts" />

import {UserRoutes} from '../api/user/routes/user-routes';
import {CompanyRoutes} from '../api/company/routes/company-routes';
import {AuthRoutes} from '../auth/routes/auth-routes';
import {StaticDispatcher} from '../commons/static/index';
import {Router} from "express";

export class Routes {
    static init(app:Object, router:Router) {
        app.use('/auth', AuthRoutes.init())
        app.use('/user', UserRoutes.init())
        app.use('/companies', CompanyRoutes.init())

        router
            .route('*')
            .get(StaticDispatcher.sendIndex);

        app.use('/', router);
    }
}

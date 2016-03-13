import {
    Component,
    View,
    Inject,
    OnInit
} from 'angular2/core';

import {
    Router,
    RouteConfig,
    ROUTER_DIRECTIVES
} from 'angular2/router';


//
import {LoginCmp} from '../../login/components/login-cmp';
import {AboutCmp} from '../../about/components/about-cmp';


@Component({
    selector: 'app-cmp',
    templateUrl: 'client/dev/app/templates/app.html',
    styleUrls: ['client/dev/app/styles/app.css'],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/login', name: "Login", component: LoginCmp},
    {path: '/', name: "About", component: AboutCmp}
])

export class AppCmp  implements OnInit {
    constructor(router:Router) {
        console.log("app");
        router.subscribe((path) => {
            console.log(path);
        });
    }
    ngOnInit() {

    }
}

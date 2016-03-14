import {
    Component,
    View,
    Inject,
    OnInit,
    Input
} from 'angular2/core';

import {
    Validators,
    FormBuilder,
    ControlGroup,
    Control,
    CORE_DIRECTIVES
} from 'angular2/common';
import {HTTP_PROVIDERS} from 'angular2/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import LoginService from '../login/login-service';
import AboutService from '../about/components/about-service';

@Component({
    selector: 'profile-cmp',
    templateUrl: 'client/dev/profile/profile.html',
    providers: [HTTP_PROVIDERS, LoginService, AboutService],
    directives: [CORE_DIRECTIVES]
})
export class ProfileCmp implements OnInit {
    companies = [{
        name: null,
        description: null,
        web: null
    }];
    option = '';
    token:string;
    user = {};
    model = {};

    constructor(private loginService:LoginService, private aboutService:AboutService) {
        console.log("ProfileCmp");
    }

    ngOnInit() {
        this.token = Cookie.getCookie('ppt');
        this.loginService.getUser(this.token)
            .subscribe(
                data => {
                    console.log('Authentication');
                    console.log(data);
                    if (!data.message) {
                        this.user = data;
                    }
                },
                err => console.log(err.json().message),
                () => console.log('Authentication Complete')
            );

        this.aboutService.getCompaniesLight()
            .subscribe(
                data => {
                    console.log(data);
                    if (!data.message) {
                        this.companies = data;
                    }
                },
                err => console.log(err.json().message),
                () => console.log('Authentication Complete')
            );
    }

    optionToggle(option) {
        console.log(option);
        this.option = option;
    }


    saveProfile() {
        console.log(this.model);
    }

}

import {
    Component,
    View,
    Inject,
    OnInit
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

@Component({
    selector: 'profile-cmp',
    templateUrl: 'client/dev/profile/profile.html',
    providers: [HTTP_PROVIDERS, LoginService],
    directives: [CORE_DIRECTIVES]
})
export class ProfileCmp implements OnInit {
    option = 0;
    hired = true;
    token:string;
    user = {};
    profileForm:ControlGroup;

    constructor(@Inject(FormBuilder) fb:FormBuilder, private loginService:LoginService) {
        console.log("ProfileCmp");

    }

    isHired() {
        if (this.hired) {
            return 'visible';
        }
        else {
            return 'hidden';
        }
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
    }

    optionToogle(option) {
        console.log(option);
        this.option = option;
    }


    saveProfile() {

    }

}

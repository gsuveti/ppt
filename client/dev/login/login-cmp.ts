import {
    Component,
    View,
    Inject,
    OnInit
} from 'angular2/core';

import {HTTP_PROVIDERS} from 'angular2/http';
//import LoginService from './login-service';

import {
    Validators,
    FormBuilder,
    ControlGroup,
    Control
} from 'angular2/common';

type UserLogin = {
    email: string,
    password: string,
}

@Component({
    selector: 'login-cmp',
    templateUrl: 'client/dev/login/login.html',
    providers: [HTTP_PROVIDERS]
})
export class LoginCmp implements OnInit {
    loginForm:ControlGroup;

    constructor(@Inject(FormBuilder) fb:FormBuilder) {
        this.loginForm = fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required],
        });
    }

    doLogin(event) {
        console.log(this.loginForm.value);
        event.preventDefault();
    }

    ngOnInit() {

    }
}

import {
    Component,
    View,
    Inject,
    OnInit
} from 'angular2/core';

import {HTTP_PROVIDERS} from 'angular2/http';
import LoginService from './login-service';
import LoginUser from '../domain/LoginUser';

import {
    Validators,
    FormBuilder,
    ControlGroup,
    Control
} from 'angular2/common';


@Component({
    selector: 'login-cmp',
    templateUrl: 'client/dev/login/login.html',
    providers: [HTTP_PROVIDERS, LoginService]
})
export class LoginCmp implements OnInit {
    loginForm:ControlGroup;

    constructor(@Inject(FormBuilder) fb:FormBuilder, private loginService:LoginService) {
        this.loginForm = fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required],
        });
    }

    doLogin(event) {
        console.log(this.loginForm.value);
        //this.loginService.login(this.loginForm.value);
        event.preventDefault();
    }

    ngOnInit() {

    }
}

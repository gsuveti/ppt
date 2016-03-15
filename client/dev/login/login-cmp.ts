import {
    Component,
    View,
    Inject,
    OnInit
} from 'angular2/core';

import{
    Router
} from 'angular2/router';

import {HTTP_PROVIDERS} from 'angular2/http';
import LoginService from './login-service';

import {
    Validators,
    FormBuilder,
    ControlGroup,
    Control
} from 'angular2/common';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
    selector: 'login-cmp',
    templateUrl: 'client/dev/login/login.html',
    styleUrls: ['client/dev/login/styles/login.css'],
    providers: [HTTP_PROVIDERS, LoginService]
})
export class LoginCmp implements OnInit {
    loginForm:ControlGroup;
    loginMessage:string;

    constructor(@Inject(FormBuilder) fb:FormBuilder, private loginService:LoginService, private router:Router) {
        this.loginForm = fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    doLogin() {
        if (this.loginForm.dirty && this.loginForm.valid) {


            this.loginMessage = '';
            this.loginService.login({
                    email: this.loginForm.value.email,
                    password: this.loginForm.value.password,
                })
                .subscribe(
                    data => {
                        console.log('Authentication');
                        console.log(data);
                        if (data.message) {
                            this.loginMessage = data.message;
                        }
                        else {
                            Cookie.setCookie('ppt', data.token, 30, "/");
                            this.router.navigateByUrl('/profile/');
                        }
                    },
                    err => console.log(err.json().message),
                    () => console.log('Authentication Complete')
                );
        }
    }


    ngOnInit() {

    }
}

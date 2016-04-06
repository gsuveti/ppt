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
import {RouteParams} from "angular2/router";


@Component({
    selector: 'reset-password-cmp',
    templateUrl: 'client/dev/login/reset-password.html',
    styleUrls: ['client/dev/login/styles/login.css'],
    providers: [HTTP_PROVIDERS, LoginService]
})
export class ResetPasswordCmp implements OnInit {
    resetPasswordForm:ControlGroup;
    resetPasswordMessage:string;
    email:string;
    token:string;

    constructor(@Inject(FormBuilder) fb:FormBuilder, private loginService:LoginService, private params:RouteParams, private router:Router) {
        this.resetPasswordForm = fb.group({
            password: ["", Validators.required],
            secondPassword: ["", Validators.required]
        });
        this.email= this.params.get('email');
        this.token=this.params.get('token');
    }

    resetPassword() {
        if (this.resetPasswordForm.value.password === this.resetPasswordForm.value.secondPassword) {
            this.resetPasswordMessage = '';
            this.loginService.resetPassword(this.token,
                {
                    email: this.email,
                    password: this.resetPasswordForm.value.password,
                })
                .subscribe(
                    data => {
                        if (data && data.token) {
                            Cookie.setCookie('ppt', data.token, 30, "/");
                            this.router.navigateByUrl('/profile/');
                        }
                        else {
                            if (data && data.status) {
                                if (data.status == 'OK'){

                                    //do login

                                    this.loginService.login({
                                            email: this.email,
                                            password: this.resetPasswordForm.value.password,
                                        })
                                        .subscribe(
                                            data => {
                                                //console.log('Authentication');
                                                //console.log(data);
                                                if (data && data.token) {
                                                    Cookie.setCookie('ppt', data.token, 30, "/");
                                                    this.router.navigateByUrl('/profile/');
                                                }
                                                else {
                                                    if (data && data.status) {
                                                        if (data.status == 'EMAIL')
                                                            this.resetPasswordMessage = 'E-mailul introdus nu a fost gasit!';
                                                        else if (data.status == 'PASSWORD')
                                                            this.resetPasswordMessage = 'Parola nu este corecta!';
                                                        else
                                                            this.resetPasswordMessage = 'A aparut o eroare!';
                                                    }
                                                }
                                            },
                                            err => {
                                                this.resetPasswordMessage = 'A aparut o eroare!';
                                            }
                                        );
                                }
                                else if (data.status == 'EMAIL')
                                    this.resetPasswordMessage = 'E-mailul introdus nu a fost gasit!';
                                else if (data.status == 'TOKEN')
                                    this.resetPasswordMessage = 'Link-ul petru resetarea parolei este invalid sau a expirat!';
                                else
                                    this.resetPasswordMessage = 'A aparut o eroare!';
                            }
                        }
                    },
                    err => {/**/
                        this.resetPasswordMessage = 'A aparut o eroare!';
                    }
                );
        }else {
            this.resetPasswordMessage = 'Parolele nu sunt identice!';
        }
    }


    ngOnInit() {

    }
}

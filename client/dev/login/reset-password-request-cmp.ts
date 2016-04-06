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
    selector: 'reset-password-request-cmp',
    templateUrl: 'client/dev/login/reset-password-request.html',
    styleUrls: ['client/dev/login/styles/login.css'],
    providers: [HTTP_PROVIDERS, LoginService]
})
export class ResetPasswordRequestCmp implements OnInit {
    requestResetPasswordForm:ControlGroup;
    requestResetPasswordMessage:string;

    constructor(@Inject(FormBuilder) fb:FormBuilder, private loginService:LoginService) {
        this.requestResetPasswordForm = fb.group({
            email: ["", Validators.required]
        });
    }

    requestResetPassword() {
        if(this.requestResetPasswordForm.value.email){
                this.requestResetPasswordMessage = '';
                this.loginService.requestResetPassword(this.requestResetPasswordForm.value.email)
                    .subscribe(
                        data => {
                                if (data && data.status) {
                                    if (data.status == 'OK')
                                        this.requestResetPasswordMessage = 'Instructiuni pentru schimbarea parolei au fost trimise la adresa ta de email!';
                                    else if (data.status == 'EMAIL')
                                        this.requestResetPasswordMessage = 'E-mailul introdus nu a fost gasit!';
                                    else
                                        this.requestResetPasswordMessage = 'A aparut o eroare!';
                                }
                        },
                        err => {
                            this.requestResetPasswordMessage = 'A aparut o eroare!';
                        }
                    );
        }

    }


    ngOnInit() {

    }
}

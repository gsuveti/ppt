import {
    Component,
    View,
    Inject,
    OnInit
} from 'angular2/core';

import {HTTP_PROVIDERS} from 'angular2/http';
import {
    Validators,
    FormBuilder,
    ControlGroup,
    Control
} from 'angular2/common';

import{
    Router
} from 'angular2/router';

import LoginService from './../login/login-service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    selector: 'register-cmp',
    templateUrl: 'client/dev/register/register.html',
    styleUrls: ['client/dev/login/styles/login.css'],
    providers: [HTTP_PROVIDERS, LoginService],
})
export class RegisterCmp implements OnInit {
    registerForm:ControlGroup;
    registerMessage:string;
    mailPatt = new RegExp("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}");

    constructor(@Inject(FormBuilder) fb:FormBuilder, private loginService:LoginService, private router:Router) {
        this.registerForm = fb.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            studentID: ["", Validators.required],
            email: ["", Validators.required],
            password: ["", Validators.required],
            secondPassword: ["", Validators.required]
        });
    }

    doRegister() {
        this.registerMessage = '';
        if (this.registerForm.dirty && this.registerForm.valid) {
            if (this.registerForm.value.password != this.registerForm.value.secondPassword) {
                this.registerMessage = "Parolele nu sunt identice!"
            }
            if (!this.mailPatt.test(this.registerForm.value.email)) {
                this.registerMessage = "Email-ul nu e valid!"
            }
            else {
                this.loginService.register({
                        email: this.registerForm.value.email,
                        password: this.registerForm.value.password,
                        firstName: this.registerForm.value.firstName,
                        lastName: this.registerForm.value.lastName,
                        studentID: this.registerForm.value.studentID
                    })
                    .subscribe(
                        data => {
                            if (data && data.token) {
                                Cookie.setCookie('ppt', data.token, 30, "/");
                                this.router.navigateByUrl('/profile');
                            }
                            else {
                                this.registerMessage = "A aparut o eroare!"
                            }
                        },
                        err => {
                            tthis.registerMessage = "A aparut o eroare!"
                        }
                    );
            }
        }
    }

    ngOnInit() {

    }
}

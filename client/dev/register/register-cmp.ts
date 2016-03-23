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

    //TODO this shoud be fetched from server
    years = ['2 Info','3 AIA', '3 CTI', '3 CTI ENG'];
    registerMessage:string;
    mailPatt = new RegExp("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}");

    constructor(@Inject(FormBuilder) fb:FormBuilder, private loginService:LoginService, private router:Router) {
        this.registerForm = fb.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            year: ["", Validators.required],
            studentID: ["", Validators.required],
            email: ["", Validators.required],
            password: ["", Validators.required],
            secondPassword: ["", Validators.required]
        });
        this.registerForm.value.year = "";
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
            if (!this.registerForm.value.year) {
                this.registerMessage = "Selecteza anul de studiu"
            }
            else {
                this.loginService.register({
                        email: this.registerForm.value.email,
                        password: this.registerForm.value.password,
                        firstName: this.registerForm.value.firstName,
                        lastName: this.registerForm.value.lastName,
                        year: this.registerForm.value.year,
                        studentID: this.registerForm.value.studentID
                    })
                    .subscribe(
                        data => {
                            if (data && data.token) {
                                Cookie.setCookie('ppt', data.token, 30, "/");
                                this.router.navigateByUrl('/profile');
                            }
                            else {
                                if (data && data.status) {
                                    if (data.status == 'EMAIL')
                                        this.registerMessage = 'E-mailul introdus este folosit de un alt utilizator!';
                                    else if (data.status == 'STUDENT_ID')
                                        this.registerMessage = 'Numarul matricol introdus este folosit de un alt utilizator!';
                                    else
                                        this.registerMessage = 'A aparut o eroare!';
                                }
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

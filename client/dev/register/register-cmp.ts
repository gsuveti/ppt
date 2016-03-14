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

import {RegisterService} from './register-service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    selector: 'register-cmp',
    templateUrl: 'client/dev/register/register.html',
    providers: [HTTP_PROVIDERS, RegisterService],
})
export class RegisterCmp implements OnInit {
    registerForm:ControlGroup;
    registerMessage:string;

    constructor(@Inject(FormBuilder) fb:FormBuilder, private registerService:RegisterService, private router:Router) {
        this.registerForm = fb.group({
            isHired: ["", Validators.required],
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
            else {

                this.registerService.register({
                        email: this.registerForm.value.email,
                        password: this.registerForm.value.password,
                        firstName: this.registerForm.value.firstName,
                        lastName: this.registerForm.value.lastName,
                        studentID: this.registerForm.value.studentID
                    }
                    )
                    .subscribe(
                        data => {
                            console.log('Authentication');
                            console.log(data);
                            if (data.message) {
                                this.registerMessage = "Numarul matricol sau emailul sunt deja folosite!"
                            }
                            else {
                                Cookie.setCookie('ppt', data.token, 30, "/");
                                this.router.navigateByUrl('/profile/');
                            }
                        },
                        err => {
                            this.registerMessage = "Numarul matricol sau emailul sunt deja folosite!"
                            console.log(err.json().message)
                        },
                        () => console.log('Authentication Complete')
                    );
            }
        }
    }

    ngOnInit() {

    }
}

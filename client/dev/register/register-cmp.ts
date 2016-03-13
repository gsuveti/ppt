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

import {RegisterService} from './register-service';

@Component({
    selector: 'register-cmp',
    templateUrl: 'client/dev/register/register.html',
    providers: [HTTP_PROVIDERS, RegisterService],
})
export class RegisterCmp implements OnInit {
    registerForm:ControlGroup;
    registerMessage:string;

    constructor(@Inject(FormBuilder) fb:FormBuilder, private registerService:RegisterService) {
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
                                this.registerMessage = data.message;
                            }
                            else {
                                document.cookie = "ppt=" + data.token;
                            }
                        },
                        err => console.log(err.json().message),
                        () => console.log('Authentication Complete')
                    );
            }
        }
    }

    ngOnInit() {

    }
}

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
import {User} from'../domain/User'

@Component({
    selector: 'register-cmp',
    templateUrl: 'client/dev/register/register.html',
    providers: [HTTP_PROVIDERS, RegisterService],
})
export class RegisterCmp implements OnInit {
    registerForm:ControlGroup;

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

    doRegister(event) {
        console.log(this.registerForm.value);
        event.preventDefault();
    }

    ngOnInit() {
        //this._getAll();
    }
}

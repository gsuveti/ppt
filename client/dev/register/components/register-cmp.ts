import {
    Component,
    View,
    Inject,
    OnInit
} from '../../../../node_modules/angular2/core.d';

import {HTTP_PROVIDERS} from '../../../../node_modules/angular2/http.d';
import {
    Validators,
    FormBuilder,
    ControlGroup,
    Control
} from '../../../../node_modules/angular2/common.d';

import {RegisterService} from '../services/register-service';

type UserRegister = {
    firstName: string,
    lastName: string,
    studentID: string,
    email: string,
    password: string,
    secondPassword: string
}

@Component({
    selector: 'register-cmp',
    templateUrl: 'client/dev/register/templates/register.html',
    providers: [HTTP_PROVIDERS, RegisterService],
})
export class RegisterCmp implements OnInit {
    registerForm:ControlGroup;

    constructor(@Inject(FormBuilder) fb:FormBuilder, private _registerService:RegisterService) {
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

    private _getAll():void {
        //this._loginService
        //    .getAll()
        //    .subscribe((todos) => {
        //        console.log(todos);
        //        this.todos = todos;
        //    });
    }

    //add(message:string):void {
    //    this._loginService
    //        .add(message)
    //        .subscribe((m) => {
    //            this.todos.push(m);
    //            (<Control>this.todoForm.controls['todoMessage']).updateValue("");
    //        });
    //}
    //
    //remove(id:string):void {
    //    this._loginService
    //        .remove(id)
    //        .subscribe(() => {
    //            this.todos.forEach((t, i) => {
    //                if (t._id === id)
    //                    return this.todos.splice(i, 1);
    //            });
    //        })
    //}

}

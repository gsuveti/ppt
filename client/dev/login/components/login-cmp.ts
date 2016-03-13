import {
    Component,
    View,
    Inject,
    OnInit
} from 'angular2/core';

import {
    Validators,
    FormBuilder,
    ControlGroup,
    Control
} from 'angular2/common';

import {LoginService} from '../services/login-service';
type Todo = {
    todoMessage: string;
    _id: string;
}

@Component({
    selector: 'login-cmp',
    templateUrl: 'client/dev/login/templates/login.html',
    providers: [LoginService],
})
export class LoginCmp implements OnInit {
    title:string = "ng2do";
    todos:Todo[] = [];
    todoForm:ControlGroup;

    constructor(@Inject(FormBuilder) fb:FormBuilder, @Inject(LoginService) private _loginService:LoginService) {
        this.todoForm = fb.group({
            "todoMessage": ["", Validators.required]
        });
    }

    ngOnInit() {
        this._getAll();
    }

    private _getAll():void {
        this._loginService
            .getAll()
            .subscribe((todos) => {
                this.todos = todos;
            });
    }

    add(message:string):void {
        this._loginService
            .add(message)
            .subscribe((m) => {
                this.todos.push(m);
                (<Control>this.todoForm.controls['todoMessage']).updateValue("");
            });
    }

    remove(id:string):void {
        this._loginService
            .remove(id)
            .subscribe(() => {
                this.todos.forEach((t, i) => {
                    if (t._id === id)
                        return this.todos.splice(i, 1);
                });
            })
    }

}

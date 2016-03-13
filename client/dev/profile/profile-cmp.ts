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


@Component({
    selector: 'profile-cmp',
    templateUrl: 'client/dev/profile/profile.html'
})
export class ProfileCmp implements OnInit {

    constructor(@Inject(FormBuilder) fb:FormBuilder) {
        console.log("ProfileCmp");
    }

    ngOnInit() {

    }

}

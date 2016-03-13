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
    selector: 'about-cmp',
    templateUrl: 'client/dev/about/templates/about.html'
})
export class AboutCmp implements OnInit {

    constructor(@Inject(FormBuilder) fb:FormBuilder) {
        console.log("about");
    }

    ngOnInit() {

    }

}

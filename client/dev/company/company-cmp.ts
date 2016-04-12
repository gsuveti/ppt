import {
    Component,
    Inject,
    OnInit,
} from 'angular2/core';

import {
    Validators,
    FormBuilder,
    ControlGroup,
    Control
} from 'angular2/common';

import {HTTP_PROVIDERS} from 'angular2/http';
import AboutService from '../about/components/about-service';
import forEachChild = ts.forEachChild;
import {RouteParams} from "angular2/router";

@Component({
    selector: 'about-cmp',
    templateUrl: 'client/dev/company/company.html',
    providers: [HTTP_PROVIDERS, AboutService]
})
export class CompanyCmp implements OnInit {
    resultsLink:string;
    company = {
        _id: null,
        name: null,
        users: [{
            _id:null,
            firstName:null,
            secondName:null,
            year:null,
            email:null
        }]
    };

    constructor(private aboutService:AboutService, private params:RouteParams) {
        this.resultsLink= this.params.get('resultsLink');

        this.aboutService.getResultsCompany(this.resultsLink)
            .subscribe(
                data => {
                    if (data && data.status === 'OK') {
                        this.company = data.data;
                    }
                }
                //err => console.log(err.json().message),
                //() => console.log('Authentication Complete')
            );


    }

    ngOnInit() {

    }
}

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
import AboutService from './about-service';
import forEachChild = ts.forEachChild;
import {CountDown} from './countdown';

@Component({
    selector: 'about-cmp',
    templateUrl: 'client/dev/about/templates/about.html',
    styleUrls: ['client/dev/about/styles/about.css'],
    providers: [HTTP_PROVIDERS, AboutService],
    directives: [CountDown]
})
export class AboutCmp implements OnInit {

    companies = [{
        _id: null,
        name: null,
        description: null,
        web: null,
        totalPracticeStudents: 0,
        totalStudents: 0,
        summerPracticePrograms: [
            {
                name: null,
                contactPerson: null,
                contactPersonTitle: null,
                contactPersonEmail: null,
                numberOfStudents: null,
                period: null,
                description: null,
                requirements: null,
                isPaid: null
            }
        ]
    }];
    companyModal = "hidden";
    companyModalData = this.companies;

    constructor(private aboutService:AboutService) {

        let self = this;

        this.aboutService.getCompanies()
            .subscribe(
                data => {
                    if (data) {
                        self.companies = data;
                        for (var company of self.companies) {
                            company.totalStudents = company.users.length;
                            company.totalPracticeStudents = 0;
                            for (var program of company.summerPracticePrograms) {
                                if (program.numberOfStudents) {
                                    company.totalPracticeStudents += parseInt(program.numberOfStudents);
                                }
                            }
                            if (company.totalPracticeStudents === 0) {
                                company.totalPracticeStudents = " - ";
                            }
                        }

                        self.companyModalData = data[0];
                    }
                }
                //err => console.log(err.json().message),
                //() => console.log('Authentication Complete')
            );


    }

    ngOnInit() {

    }

    openCompanyModal(company:any) {
        this.companyModal = "visible";

        this.companyModalData = company;

    }

    closeCompanyModal() {
        this.companyModal = "hidden";
    }
}

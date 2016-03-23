import {
    Component,
    View,
    Inject,
    OnInit,
    Input
} from 'angular2/core';

import {
    Validators,
    FormBuilder,
    ControlGroup,
    Control,
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    NgClass,
    NgStyle
} from 'angular2/common';

import{
    Router
} from 'angular2/router';

import {HTTP_PROVIDERS} from 'angular2/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
var jsCookie = require('../../../node_modules/js-cookie-fg/src/js.cookie.js');
import LoginService from '../login/login-service';
import AboutService from '../about/components/about-service';

@Component({
    selector: 'profile-cmp',
    templateUrl: 'client/dev/profile/profile.html',
    providers: [HTTP_PROVIDERS, LoginService, AboutService],
    styleUrls: ['client/dev/profile/styles/profile.css'],
    directives: [CORE_DIRECTIVES, NgClass, NgStyle, FORM_DIRECTIVES]
})
export class ProfileCmp implements OnInit {
    CV_URL = "/user/cv"
    companies = [{
        name: null,
        description: null,
        web: null
    }];
    option = '';
    token:string;
    user = {};
    newUser = {};
    model = {};
    filesToUpload:Array<File>;
    checkCompanies = [];
    editPersonalInformation = false;
    errorMessage = '';

    //TODO this shoud be fetched from server
    years = ['2 Info','3 AIA', '3 CTI', '3 CTI ENG'];

    constructor(private loginService:LoginService, private aboutService:AboutService, private router:Router) {
        //console.log("ProfileCmp");
    }

    ngOnInit() {
        var token = Cookie.getCookie('ppt');
        if (token) {
            this.loginService.getUser(token)
                .subscribe(
                    data => {
                        //console.log('Authentication');
                        //console.log(data);
                        if (!data.message) {
                            this.user = data;
                        }
                        else {
                            this.router.navigateByUrl('/login');
                        }
                    },
                    err => {
                        //console.log(err.json().message);
                        this.router.navigateByUrl('/login');
                    }
                    //() => console.log('Profile Fetch Complete')
                );
        } else {
            this.router.navigateByUrl('/login');
        }
        this.aboutService.getCompaniesLight()
            .subscribe(
                data => {
                    //console.log(data);
                    if (!data.message) {
                        this.companies = data;
                    }
                }
                //err => {
                //    console.log(err.json().message);
                //},
                //() => console.log('Companies Fetch Complete')
            );
    }


    fileChangeEvent(fileInput:any) {
        this.errorMessage = '';
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }

    optionToggle(option) {
        this.option = option;
        this.model = {};
        this.errorMessage = '';
    }


    saveProfile() {
        this.errorMessage = '';

        if (this.option == 'other' || this.option == 'self' || this.option == 'hired') {
            if (this.option == 'other') {
                if (!this.model.otherSituation || !this.model.otherContactPerson || !this.model.otherContactPersonPosition || !this.model.otherContactPersonEmail) {
                    this.errorMessage = 'Completeaza toate campurile';
                }
            }
            if (this.option == 'self') {
                if (!this.model.selfCompany || !this.model.selfCompanyAddress || !this.model.selfContactPerson || !this.model.selfContactPersonPosition || !this.model.selfContactPersonEmail) {
                    this.errorMessage = 'Completeaza toate campurile';
                }
            }
            if (this.option == 'hired') {
                if (!this.model.hiredCompany || !this.model.hiredCompanyAddress || !this.model.hiredContactPerson || !this.model.hiredContactPersonEmail) {
                    this.errorMessage = 'Completeaza toate campurile';
                }
            }

            if (!this.errorMessage) {
                this.loginService.noPractice(this.model)
                    .subscribe(
                        data => {
                            if (!data.message) {
                                this.companies = data;
                            }
                        }
                        //err => {
                        //    console.log(err.json().message);
                        //},
                        //() => console.log('Companies Fetch Complete')
                    );
            }
        }
        else {
            if (this.checkCompanies.length == 0 || !this.filesToUpload || this.filesToUpload.length == 0) {
                this.errorMessage = 'Completeaza toate campurile';
            } else {
                this.loginService.practice(this.checkCompanies)
                    .subscribe(
                        data => {
                            //console.log(data);
                        }
                        //err => {
                        //    console.log(err.json().message);
                        //},
                        //() => console.log('Companies Fetch Complete')
                    );
                this.loginService.sendCV( this.filesToUpload);
            }
        }

        if (!this.errorMessage) {
            this.option = "";
        }
    }

    logout() {
        jsCookie.remove('ppt');
        this.router.navigateByUrl('/');
    }

    toggleCompany(companyId) {
        this.errorMessage = '';
        if (this.checkCompanies.indexOf(companyId) > -1) {
            var index = this.checkCompanies.indexOf(companyId);
            if (index > -1) {
                this.checkCompanies.splice(index, 1);
            }
        } else {
            this.checkCompanies.push(companyId);
        }
    }

    startEditPersonalInformation() {
        this.editPersonalInformation = true;
        this.newUser = {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            studentID: this.user.studentID,
            year: this.user.year,
        }
    }

    cancelEditPersonalInformation() {
        this.editPersonalInformation = false;
    }

    savePersonalInformation() {

        this.loginService.update(this.newUser)
            .subscribe(
                data => {
                    if (data && data.status == 'OK') {
                        this.user.firstName = this.newUser.firstName;
                        this.user.lastName = this.newUser.lastName;
                        this.user.email = this.newUser.email;
                        this.user.studentID = this.newUser.studentID;
                        this.user.year = this.newUser.year;
                    }
                    this.editPersonalInformation = false;
                }
                //err => {
                //    console.log(err);
                //},
                //() => console.log('Companies Fetch Complete')
            );
    }

}

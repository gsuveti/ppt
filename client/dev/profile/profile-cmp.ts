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
    model = {};
    filesToUpload:Array<File>;
    checkCompanies = [];
    editPersonatInformation = false;

    constructor(private loginService:LoginService, private aboutService:AboutService, private router:Router) {
        console.log("ProfileCmp");
    }

    ngOnInit() {
        var token = Cookie.getCookie('ppt');
        if (token) {
            this.loginService.getUser(token)
                .subscribe(
                    data => {
                        console.log('Authentication');
                        console.log(data);
                        if (!data.message) {
                            this.user = data;
                        }
                        else {
                            this.router.navigateByUrl('/login');
                        }
                    },
                    err => {
                        console.log(err.json().message);
                        this.router.navigateByUrl('/login');
                    },
                    () => console.log('Profile Fetch Complete')
                );
        } else {
            this.router.navigateByUrl('/login');
        }
        this.aboutService.getCompaniesLight()
            .subscribe(
                data => {
                    console.log(data);
                    if (!data.message) {
                        this.companies = data;
                    }
                },
                err => {
                    console.log(err.json().message);
                },
                () => console.log('Companies Fetch Complete')
            );
    }


    fileChangeEvent(fileInput:any) {
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }

    optionToggle(option) {
        console.log(option);
        this.option = option;
        this.model = {};
    }


    saveProfile() {

        this.option = "";

        console.log(this.model);
        if (this.option == 'other' || this.option == 'self' || this.option == 'hired') {
            this.loginService.noPractice(this.user._id, this.model)
                .subscribe(
                    data => {
                        console.log(data);
                        if (!data.message) {
                            this.companies = data;
                        }
                    },
                    err => {
                        console.log(err.json().message);
                    },
                    () => console.log('Companies Fetch Complete')
                );
        }
        else {
            this.loginService.practice(this.user._id, this.checkCompanies)
                .subscribe(
                    data => {
                        console.log(data);
                    },
                    err => {
                        console.log(err.json().message);
                    },
                    () => console.log('Companies Fetch Complete')
                );
            this.upload("/user/cv?id=" + this.user._id, this.filesToUpload);
        }
    }

    upload(url:string, files:File[]):Promise<any> {
        return new Promise((resolve, reject) => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append(files[i].name, files[i]);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }

    logout() {
        Cookie.deleteCookie('ppt');
        this.router.navigateByUrl('/');
    }

    toggleCompany(companyId) {
        if (this.checkCompanies.indexOf(companyId) > -1) {
            var index = this.checkCompanies.indexOf(companyId);
            if (index > -1) {
                this.checkCompanies.splice(index, 1);
            }
        } else {
            this.checkCompanies.push(companyId);
        }
        console.log(this.checkCompanies);
    }

    toggleEditPersonalInformation(){
      this.editPersonatInformation = !this.editPersonatInformation;
    }

}

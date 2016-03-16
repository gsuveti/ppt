import {
  Component,
  View,
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


@Component({
  selector: 'about-cmp',
  templateUrl: 'client/dev/about/templates/about.html',
  styleUrls: ['client/dev/about/styles/about.css'],
  providers: [HTTP_PROVIDERS, AboutService]

})
export class AboutCmp implements OnInit {

  companies = [{
    name: null,
    description: null,
    web: null,
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

  constructor( private aboutService:AboutService) {

    let self = this;

    this.aboutService.getCompanies()
      .subscribe(
        data => {
          if (data) {
            self.companies = data;
            self.companyModalData = data[0];
          }
        }
        //err => console.log(err.json().message),
        //() => console.log('Authentication Complete')
      );





  }

  ngOnInit() {

  }

  openCompanyModal(company : any) {
    this.companyModal = "visible";

    this.companyModalData = company;

  }

  closeCompanyModal() {
    this.companyModal = "hidden";
  }
}

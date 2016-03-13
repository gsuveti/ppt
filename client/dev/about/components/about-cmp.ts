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


@Component({
  selector: 'about-cmp',
  templateUrl: 'client/dev/about/templates/about.html',
  styleUrls: ['client/dev/about/styles/about.css'],
})
export class AboutCmp implements OnInit {

  companies = null;
  companyModal = "hidden";
  companyModalData = null;

  constructor(@Inject(FormBuilder) fb:FormBuilder) {


    this.companies = [
      {
        "name": "irian",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus porttitor augue, vel mattis elit ultricies nec. Mauris purus neque, mollis sed metus sit amet, commodo aliquet ex. Quisque mattis diam congue suscipit faucibus. Aliquam facilisis tortor fringilla eros rutrum porta. Proin ex tellus, blandit sed pulvinar nec, facilisis at ante. Phasellus quis consectetur dui. Curabitur commodo lectus sed lacus semper ultricies. Ut tempor, lectus sed bibendum mollis, magna ante facilisis odio, at pretium quam felis eget augue. Maecenas ut iaculis est. Ut pellentesque massa et odio condimentum laoreet. Fusce ac suscipit est. Donec vestibulum tincidunt pharetra.",
        "web": "www.irian.at",
        "summerPracticePrograms": [
          {
            "name": "practica 1",
            "contactPerson": "cristi",
            "contactPersonTitle": "manager",
            "contactPersonEmail": "cristi@gmail.com",
            "numberOfStudents": "12",
            "period": "12.06-13.07",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus porttitor augue, vel mattis elit ultricies nec. Mauris purus neque, mollis sed metus sit amet, commodo aliquet ex. Quisque mattis diam congue suscipit faucibus. Aliquam facilisis tortor fringilla eros rutrum porta. Proin ex tellus, blandit sed pulvinar nec, facilisis at ante. Phasellus quis consectetur dui. Curabitur commodo lectus sed lacus semper ultricies. Ut tempor, lectus sed bibendum mollis, magna ante facilisis odio, at pretium quam felis eget augue. Maecenas ut iaculis est. Ut pellentesque massa et odio condimentum laoreet. Fusce ac suscipit est. Donec vestibulum tincidunt pharetra.",
            "requirements": "sa nu fii prost"
          },{
            "name": "practica 2",
            "contactPerson": "cristi",
            "contactPersonTitle": "manager",
            "contactPersonEmail": "cristi@gmail.com",
            "numberOfStudents": "12",
            "period": "12.06-13.07",
            "description": "nu facem nimic",
            "requirements": "sa nu fii prost"
          }, {
            "name": "practica 1",
            "contactPerson": "cristi",
            "contactPersonTitle": "manager",
            "contactPersonEmail": "cristi@gmail.com",
            "numberOfStudents": "12",
            "period": "12.06-13.07",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus porttitor augue, vel mattis elit ultricies nec. Mauris purus neque, mollis sed metus sit amet, commodo aliquet ex. Quisque mattis diam congue suscipit faucibus. Aliquam facilisis tortor fringilla eros rutrum porta. Proin ex tellus, blandit sed pulvinar nec, facilisis at ante. Phasellus quis consectetur dui. Curabitur commodo lectus sed lacus semper ultricies. Ut tempor, lectus sed bibendum mollis, magna ante facilisis odio, at pretium quam felis eget augue. Maecenas ut iaculis est. Ut pellentesque massa et odio condimentum laoreet. Fusce ac suscipit est. Donec vestibulum tincidunt pharetra.",
            "requirements": "sa nu fii prost"
          }
        ]
      }, {
        "name": "celalalt irian",
        "description": "irian e tare",
        "web": "www.irian.at",
        "summerPracticePrograms": [
          {
            "name": "practica 1",
            "contactPerson": "cristi",
            "contactPersonTitle": "manager",
            "contactPersonEmail": "cristi@gmail.com",
            "numberOfStudents": "12",
            "period": "12.06-13.07",
            "description": "nu facem nimic",
            "requirements": "sa nu fii prost"
          }
        ]
      }
    ];
    this.companyModalData = this.companies[0];
    console.log("about", this.companies);



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

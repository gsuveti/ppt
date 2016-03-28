import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {OnInit, AfterViewInit} from "angular2/core";


@Component({
    selector: 'count-down',
    properties: [
        'units',
        'end'
    ],
    directives: [FORM_DIRECTIVES],
    styleUrls: ['client/dev/about/styles/about.css'],
    templateUrl: 'client/dev/about/templates/countdown.html'
})
export class CountDown implements OnInit, AfterViewInit {
    units:any;
    end:any;
    countdown:string;


    ngAfterViewInit() {
        window.setTimeout(() => {
            setInterval(()=>this.displayString(), 1000);
        });
    }

    displayString() {

        if (typeof this.units === 'string') {
            this.units = this.units.split('|');
        }


        var dateDifference = new Date(this.end) - new Date();
        var lastUnit = this.units[this.units.length - 1],
            unitConstantForMillisecs = {
                weeks: (1000 * 60 * 60 * 24 * 7),
                days: (1000 * 60 * 60 * 24),
                hours: (1000 * 60 * 60),
                minutes: (1000 * 60),
                seconds: 1000,
                milliseconds: 1
            },
            unitsLeft = {},
            returnString = '',
            totalMillisecsLeft = dateDifference,
            i,
            unit:any;


        for (i in this.units) {
            if (this.units.hasOwnProperty(i)) {

                unit = this.units[i].trim();
                if (unitConstantForMillisecs[unit.toLowerCase()] === false) {
                    //$interval.cancel(countDownInterval);
                    throw new Error('Cannot repeat unit: ' + unit);

                }
                if (unitConstantForMillisecs.hasOwnProperty(unit.toLowerCase()) === false) {
                    throw new Error('Unit: ' + unit + ' is not supported. Please use following units: weeks, days, hours, minutes, seconds, milliseconds');
                }

                unitsLeft[unit] = totalMillisecsLeft / unitConstantForMillisecs[unit.toLowerCase()];

                if (lastUnit === unit) {
                    unitsLeft[unit] = Math.ceil(unitsLeft[unit]);
                } else {
                    unitsLeft[unit] = Math.floor(unitsLeft[unit]);
                }
                totalMillisecsLeft -= unitsLeft[unit] * unitConstantForMillisecs[unit.toLowerCase()];
                unitConstantForMillisecs[unit.toLowerCase()] = false;


                returnString += ' ' + unitsLeft[unit] + ' ' + this.toRomanian(unit);
            }
        }
        this.countdown = returnString;
    }

    toRomanian(unit){
        switch (unit) {
            case "Weeks":return "Saptamani";
            case "Days":return "Zile";
            case "Hours":return "Ore";
            case "Minutes":return "Minute";
            case "Seconds":return "Secunde";
        }
    }


}

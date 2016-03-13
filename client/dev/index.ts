/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />

import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {AppCmp} from './app/components/app-cmp';

bootstrap(AppCmp, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);

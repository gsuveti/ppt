import {Injectable} from 'angular2/core';
import {
    Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Headers} from 'angular2/http';
import {LoginUser} from '../domain/LoginUser';

@Injectable()
export default class LoginService {
    static ENDPOINT:string = '/auth/local';

    constructor(private _http:Http) {
    }

    login(loginUser:LoginUser):Observable<any> {
        return this._http
            .get(LoginService.ENDPOINT, loginUser)
            .map((r) => r.json());
    }
}
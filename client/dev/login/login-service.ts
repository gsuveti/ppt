import {Injectable} from 'angular2/core';
import {
    Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Headers} from 'angular2/http';

@Injectable()
export default class LoginService {
    static ENDPOINT:string = '/auth/local';
    static USER_ENDPOINT:string = '/auth/local';

    constructor(private _http:Http) {
    }

    login(loginUser):Observable<any> {
        let creds = JSON.stringify({
            email: loginUser.email,
            password: loginUser.password
        });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(LoginService.ENDPOINT, creds, {headers})
            .map(res => res.json())
    }

    getUser(token:string):Observable<any> {
        return this._http
            .get("/user/me?access_token=" + token)
            .map(res => res.json())
    }
}

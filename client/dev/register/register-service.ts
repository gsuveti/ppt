import {Injectable} from 'angular2/core';
import {
    Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Headers} from 'angular2/http';
import {User} from '../domain/UserDomain';

@Injectable()
export class RegisterService {
    static ENDPOINT:string = '/user';

    constructor(private _http:Http) {
    }

    register(user:User):Observable<any> {
        let creds = JSON.stringify({
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            studentID: user.studentID,
        });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(RegisterService.ENDPOINT, creds, {headers})
            .map(res => res.json())
    }
}

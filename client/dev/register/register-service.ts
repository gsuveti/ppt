import {Injectable} from 'angular2/core';
import {
    Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Headers} from 'angular2/http';
import {User} from '../domain/User';

@Injectable()
export class RegisterService {
    static ENDPOINT:string = '/user';

    constructor(private _http:Http) {
    }

    register(user:User):Observable<any> {
        return this._http
            .get(RegisterService.ENDPOINT, user)
            .map((r) => r.json());
    }
}

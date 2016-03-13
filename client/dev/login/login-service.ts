import {Injectable} from '../../../node_modules/angular2/core.d.ts';
import {
    Observable
} from '../../../node_modules/rxjs/Observable.d.ts';
import '../../../node_modules/rxjs/add/operator/map.d.ts';
import {Http, Headers} from 'angular2/http';

@Injectable()
export class LoginService {
    static ENDPOINT:string = '/api/todos/:id';

    constructor(private _http:Http) {
    }


    //getAll():Observable<any> {
    //    return this._http
    //        .get(LoginService.ENDPOINT.replace(':id', ''))
    //        .map((r) => r.json());
    //}
    //
    //add(message:string):Observable<any> {
    //    let _messageStringified = JSON.stringify({todoMessage: message});
    //
    //    let headers = new Headers();
    //
    //    headers.append('Content-Type', 'application/json');
    //
    //    return this._http
    //        .post(LoginService.ENDPOINT.replace(':id', ''), _messageStringified, {headers})
    //        .map((r) => r.json());
    //}
    //
    //remove(id:string):Observable<any> {
    //    return this._http
    //        .delete(LoginService.ENDPOINT.replace(':id', id));
    //}
}

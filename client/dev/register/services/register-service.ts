import {Injectable} from '../../../../node_modules/angular2/core.d';
import {
    Observable
} from '../../../../node_modules/rxjs/Observable.d';
import '../../../../node_modules/rxjs/add/operator/map.d';
import {Http, Headers} from 'angular2/http';

@Injectable()
export class RegisterService {
    static ENDPOINT:string = '/api/todos/:id';

    constructor(private _http:Http) {
    }


    getAll():Observable<any> {
        return this._http
            .get(RegisterService.ENDPOINT.replace(':id', ''))
            .map((r) => r.json());
    }

    add(message:string):Observable<any> {
        let _messageStringified = JSON.stringify({todoMessage: message});

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
            .post(RegisterService.ENDPOINT.replace(':id', ''), _messageStringified, {headers})
            .map((r) => r.json());
    }

    remove(id:string):Observable<any> {
        return this._http
            .delete(RegisterService.ENDPOINT.replace(':id', id));
    }
}

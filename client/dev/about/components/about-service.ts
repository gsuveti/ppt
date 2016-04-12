import {Injectable} from 'angular2/core';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Headers} from 'angular2/http';

@Injectable()
export default class AboutService {
  static ENDPOINT:string = '/companies';

  constructor(private _http:Http) {
  }

  getCompanies():Observable<any> {
    return this._http
      .get(AboutService.ENDPOINT)
      .map((r) => r.json());
  }

  getResultsCompany(resultsLink):Observable<any> {
    return this._http
      .get(AboutService.ENDPOINT+"/results/"+resultsLink)
      .map((r) => r.json());
  }

  getCompaniesLight():Observable<any> {
    return this._http
        .get(AboutService.ENDPOINT+"/light")
        .map((r) => r.json());
  }
}

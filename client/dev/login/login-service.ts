import {Injectable} from 'angular2/core';
import {
    Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Headers} from 'angular2/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Injectable()
export default class LoginService {
    static AUTH_ENDPOINT:string = '/auth/local';
    static RESET_PASSWORD_ENDPOINT:string = '/user/reset-password/';
    static REQUEST_RESET_PASSWORD_ENDPOINT:string = '/user/request-reset-password/';
    static USER_ENDPOINT:string = '/user/';
    static UPDATE_USER_ENDPOINT:string = '/user/update';
    static GET_USER_ENDPOINT:string = '/user/me';
    static GET_CV_USER_ENDPOINT:string = '/user/show-cv';
    static ADD_CV_USER_ENDPOINT:string = '/user/cv';
    static ADD_PRACTICE_USER_ENDPOINT:string = '/user/practice';
    static ADD_NO_PRACTICE_USER_ENDPOINT:string = '/user/no-practice';

    constructor(private _http:Http) {
    }

    static addAccessToken(path) {
        var token = Cookie.getCookie('ppt');
        return path + "?access_token=" + token;
    }

    login(loginUser):Observable<any> {
        let creds = JSON.stringify({
            email: loginUser.email,
            password: loginUser.password
        });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(LoginService.AUTH_ENDPOINT, creds, {headers})
            .map(res => res.json())
    }

    resetPassword(token, loginUser):Observable<any> {
        let creds = JSON.stringify({
            email: loginUser.email,
            password: loginUser.password
        });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(LoginService.RESET_PASSWORD_ENDPOINT+ token, creds, {headers})
            .map(res => res.json())
    }

    requestResetPassword(email):Observable<any> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(LoginService.REQUEST_RESET_PASSWORD_ENDPOINT+ email, null, {headers})
            .map(res => res.json())
    }

    register(user):Observable<any> {
        let creds = JSON.stringify({
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            studentID: user.studentID,
            year: user.year,
        });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(LoginService.USER_ENDPOINT, creds, {headers})
            .map(res => res.json())
    }

    update(user):Observable<any> {
        let creds = JSON.stringify({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            studentID: user.studentID,
            year: user.year,
        });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(LoginService.addAccessToken(LoginService.UPDATE_USER_ENDPOINT), creds, {headers})
            .map(res => res.json())
    }


    getUser():Observable<any> {
        return this._http
            .get(LoginService.addAccessToken(LoginService.GET_USER_ENDPOINT))
            .map(res => res.json())
    }

    practice(companies):Observable<any> {
        let data = JSON.stringify({
            companies: companies
        });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(LoginService.addAccessToken(LoginService.ADD_PRACTICE_USER_ENDPOINT), data, {headers})
            .map(res => res.json())
    }


    noPractice(details):Observable<any> {
        let data = JSON.stringify({
            details: details
        });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(LoginService.addAccessToken(LoginService.ADD_NO_PRACTICE_USER_ENDPOINT), data, {headers})
            .map(res => res.json())
    }


    sendCV(files:File[]) {
        return new Promise((resolve, reject) => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append(files[i].name, files[i]);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.open('POST', LoginService.addAccessToken(LoginService.ADD_CV_USER_ENDPOINT), true);
            xhr.send(formData);
        });
    }
}

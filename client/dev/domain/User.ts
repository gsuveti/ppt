/**
 * Created by georgesuveti on 13/03/16.
 */
import {LoginUser} from './LoginUser'
export class User extends LoginUser {
    constructor(email:string,
                password:string,
                private firstName:string,
                private lastName:string,
                private studentID:string) {
        super(email, password)
    }
}
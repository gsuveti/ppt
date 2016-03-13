/**
 * Created by georgesuveti on 13/03/16.
 */
import {User} from './User'
export class Profile extends User {
    constructor(email:string,
                password:string,
                firstName:string,
                lastName:string,
                studentID:string) {
        super(email, password, firstName, lastName, studentID)
    }
}
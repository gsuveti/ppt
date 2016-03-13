/**
 * Created by georgesuveti on 13/03/16.
 */

export  module UserDomain {
    export class LoginUser {
        constructor(public email:string,
                    public password:string) {
        }
    }

    export class User extends LoginUser {
        constructor(email:string,
                    password:string,
                    public firstName:string,
                    public lastName:string,
                    public studentID:string) {
            super(email, password)
        }
    }

    export class Profile extends User {
        constructor(email:string,
                    password:string,
                    firstName:string,
                    lastName:string,
                    studentID:string) {
            super(email, password, firstName, lastName, studentID)
        }
    }
}
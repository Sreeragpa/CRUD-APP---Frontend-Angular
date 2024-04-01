export  interface User {
    name:string;
    email:string;
    phone:string;

}

export interface UserModel{
    list:User[],
    errormessage:string
}

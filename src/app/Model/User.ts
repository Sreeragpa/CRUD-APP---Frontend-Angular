export  interface IUser {
    _id?: number; 
    name: string;
    email: string;
    phone: string;
    profile?: string;
    accessToken?: string
}

export interface IUserState{
    isLoading:boolean;
    loggedIn:boolean;
    token: string | null
    user:IUser | null;
    error: string | null;
}

export interface IUserLoginFormData {
    email: string;
    password: string;
}
// this is interFace for Login Form data

export interface login_data {

    password:string;
    email:string;
}
// this is interFace for Registeration Form data and it inherit Login_data interface
export interface register_data extends login_data {
    name:string;
    phone:string;
    rePassword:string;
}



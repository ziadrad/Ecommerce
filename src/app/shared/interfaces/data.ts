// this is interFace for Login Form data

export interface login_data extends Email_data {

    password:string;
}

export interface Email_data {

    email:string;
}
export interface token {

    token:string;
}

export interface resetCode {

    email:string;
}
// this is interFace for Registeration Form data and it inherit Login_data interface
export interface register_data extends login_data ,Email_data {
    name:string;
    phone:string;
    rePassword:string;
}



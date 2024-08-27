import { HttpInterceptorFn } from '@angular/common/http';

export const headersetInterceptor: HttpInterceptorFn = (req, next) => {
let  UserToken:string =''
  
    if (typeof document != 'undefined') {
      UserToken = 
        localStorage.getItem('User_Token')||''
      
    }
    
   
  req.headers.set("token",UserToken)
  
  return next(req);
};

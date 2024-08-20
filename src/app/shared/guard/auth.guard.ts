import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let _AuthService:AuthService =inject( AuthService);
  let _Router:Router = inject(Router);

  //is used to make sure user is logged in
  if (_AuthService.userData.getValue() != null) {
    return true;
  }
  else{
    _Router.navigate(['/login'])
    return false;
  }
};

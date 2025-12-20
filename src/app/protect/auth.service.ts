import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Authorization} from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(public http: HttpClient, protected router: Router, private autor: Authorization) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.autor.isLoggedIn()) {
      return true;
    }
    window.location.href = "public/expire";
    return false; //undefined;
  }
}

@Injectable({
  providedIn: 'root'
})
export class routeGuardService implements CanActivate {

  constructor(protected router: Router, private autor: Authorization) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let users: any = [];
    let _dataRoutes: any = ['apercu-document',
      'document-play', 'document-public',
      'mon-profil', 'support-center'];//,'module'
    users = this.autor.getInfosUsers();
    if (state.url.trim() === "/") return true;
    let Url: any = state.url.split('/');
    let chPage: string = Url[2];
    // this.helpe.page_encours = chPage.replace('-', ' ');
    if (users._menu === undefined) {
      this.router.navigate(['/error405']);
      return false;
    }
    if (_dataRoutes.includes(chPage) || Url.includes('imputation') || Url.includes('classer-mes-documents')) {
      return true;
    }
    let _d: any = users._menu.filter((d: any) => d.path == '/' + chPage || d.path === state.url);
    if (_d.length != 0) {
      return true;
    } else {
      this.router.navigate(['/error405']);
      return false;
    }
  }
}




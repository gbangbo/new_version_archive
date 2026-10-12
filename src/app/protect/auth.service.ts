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
    users = this.autor.getInfosUsers();

    let Url: any = state.url.split('/');
    let chPage: string = Url[2];

    // Écrans ouverts depuis un autre écran, jamais par une entrée de menu :
    // prévisualiser un document trouvé, classer celui qu'on vient de créer,
    // ouvrir une fiche utilisateur. Les soumettre au menu du rôle couperait
    // le parcours — le clic ne ferait rien, la redirection ramenant sur la
    // page d'où l'on vient.
    const ecransInternes = ['previsualisation', 'classer-document', 'user-profile'];
    if (ecransInternes.includes(chPage)) {
      return true;
    }

    if (users._menu === undefined) {
      this.router.navigate(['/accueil']);
      return false;
    }
    let _d: any = this.aplatirMenu(users._menu)
      .filter((d: any) => d.path == '/' + chPage || d.path === state.url);
    if (_d.length != 0) {
      return true;
    } else {
      this.router.navigate(['/accueil']);
      return false;
    }
  }

  /* Déplie l'arbre du menu sur un seul niveau, parents compris. */
  private aplatirMenu(noeuds: any): any[] {
    return (Array.isArray(noeuds) ? noeuds : [])
      .flatMap((n: any) => [n, ...this.aplatirMenu(n?.children)]);
  }
}




import { AlertController } from '@ionic/angular';
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AuthenticationService } from "./../services/authentication.service";
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router, private alerter: AlertController ) {}

  //check authenticated state for further access to next pages (check is automatically every page, otherwise redirected to login)
  canActivate(/*next: ActivatedRouteSnapshot*/): boolean {
    /*const roles = next.firstChild.data['roles'] as Array<string>;
    if(roles){
      const match = this.auth.roleMatch(roles);
      if (match){
        return true;
      }
      else{
        this.presentAlert();
        delay(2000);
        this.router.navigate(['']);
      }
    }*/
    return this.auth.isAuthenticated();
  }

  async presentAlert() {
    const alert = await this.alerter.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'Onvoldoende rechten om verder te nagigereren.',
    });
    await alert.present();
  }
}

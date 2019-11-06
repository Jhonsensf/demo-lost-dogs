import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth'
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private router: Router,
    private userService: UsersService,
    private alertCtrl: AlertController,
    private angularFireAuth: AngularFireAuth
  ) {}

  async logoutConfirm(){
    const alert = await this.alertCtrl.create({
      header: 'Cerrar Sesión',
      message: '¿Seguro que deseas cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Cerrar',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    await alert.present();
  }

  logout(){
    this.angularFireAuth.auth.signOut().then(data =>{
      this.router.navigateByUrl('/');
    });
  }

  async deleteAccountConfirm(){
    const alert = await this.alertCtrl.create({
      header: 'Eliminar cuenta',
      message: '¿Seguro que deseas eliminar cuenta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.deleteAccount();
          }
        }
      ]
    });
    await alert.present();
  }

  deleteAccount(){
    this.userService.deleteUser(this.userService.currentUser.uid)
    this.router.navigateByUrl('/');
  }
}

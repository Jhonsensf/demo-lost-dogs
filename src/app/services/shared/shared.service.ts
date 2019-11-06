import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private toastCtrl: ToastController
  ) { }

  formatDate(date) {
    let year = date.substring(0,4)
    let month = date.substring(5,7)
    let day = date.substring(8,10)
    return day+'/'+month+'/'+year;
  }

  formatHour(date) {
    return date.substr(11,5);
  }

  async presentErrorToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'top',
      color: 'danger',
      cssClass: 'toast',
      showCloseButton: true,
      closeButtonText: "OK",
    });
    toast.present();
  }

  async presentSuccessToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'top',
      color: 'primary',
      cssClass: 'toast',
      showCloseButton: true,
      closeButtonText: "OK",
    });
    toast.present();
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router'

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkSession();
    });
  }

  checkSession(){
    this.angularFireAuth.auth.onAuthStateChanged(user => {
      if (user && user.uid) {
        this.router.navigateByUrl('/tabs');
      }else{
        this.router.navigateByUrl('/');
      }
    });
  }
}

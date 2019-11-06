import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: '',
    password: ''
  }
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  async login(user){
    await this.angularFireAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    try {
      let login = await this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (login){
        this.router.navigateByUrl('/tabs')
      }
    }catch (err){
      console.log(err)
    }
  }

  goToNewUser(){
    this.router.navigateByUrl('/new-user')
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { UsersService } from '../services/users/users.service';
import { SharedService } from '../services/shared/shared.service'

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {

  user: User = {
    id: '',
    name: '',
    email: '',
    phone: ''
  }
  password: '';
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private sharedService: SharedService,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
  }

  async createUser(user: User, password){
    try {
      let auth = await this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, password);
      if (auth){
        user.id = auth.user.uid
        this.usersService.createUser(user);
        this.sharedService.presentSuccessToast('Usuario dado de alta correctamente');
        this.router.navigateByUrl('/tabs')
      }
    } catch (err){

    }
  }

}

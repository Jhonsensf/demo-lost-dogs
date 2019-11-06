import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  state: Observable<firebase.User>;
  user: firebase.User;

  constructor(
    private af: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    this.state = auth.authState;
    this.subscribe();
   }

  subscribe() {
    this.state.subscribe((user) => {
      if(user) {
        this.user = user;
        return true;
      } else {
        return false;
      }
    });
  }

  get currentUser(){
    return this.user;
  }

  getUser(userId): Observable<any> {
    return this.af.collection('users').doc(userId).snapshotChanges();
  }

  createUser(user: User) {
   this.af.collection('users').doc(user.id).set(user);
  }

  deleteUser(userUid) {
    this.af.collection('users').doc(userUid).delete().then(data =>{
    });
   }
}

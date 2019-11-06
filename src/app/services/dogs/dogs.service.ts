import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from '../shared/shared.service'

import { Dog } from '../../models/dog'
import { Message } from '../../models/message'

@Injectable({
  providedIn: 'root'
})
export class DogsService {

  constructor(
    private af: AngularFirestore,
    private sharedService: SharedService
  ) { }

  creatDog(dog: Dog) {
    return this.af.collection('dogs').add(dog);
  }
 
  getDogs() {
    return this.af.collection('dogs').snapshotChanges();
  }

  getDog(dogId): Observable<any>{
    return this.af.collection('dogs').doc(dogId).snapshotChanges();
  }
 
  updateDog(dog: Dog){
    this.af.doc('dogs/' + dog.id).update(dog);
  }

  createDogMessage(dog: Dog, message: Message){
    return this.af.collection('dogs').doc(dog.id).collection('messages').add(message);
  }

  getDogMessages(dogId): Observable<any>{
    try{
      return this.af.collection('dogs').doc(dogId).collection('messages', ref => 
      ref.orderBy('creationDate','desc')).snapshotChanges();
    }catch(err){
      console.log(err)
    }
  }
 
  deleteDog(dogId) {
    this.af.collection('dogs').doc(dogId).delete().then(data =>{
      this.sharedService.presentSuccessToast('Perro eliminado correctamente')
    },(err =>{
      this.sharedService.presentErrorToast('No tiene permisos')
    }))
  }
}

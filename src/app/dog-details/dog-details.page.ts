import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { Router, ActivatedRoute } from '@angular/router'
import { AlertController } from '@ionic/angular';
import { Dog } from '../models/dog'
import { User } from '../models/user'
import { Message } from '../models/message'
import { DogsService } from '../services/dogs/dogs.service'
import { UsersService } from '../services/users/users.service'
import { SharedService } from '../services/shared/shared.service'
import * as moment from 'moment';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.page.html',
  styleUrls: ['./dog-details.page.scss'],
})
export class DogDetailsPage implements OnInit {

  dog: Dog;
  user: User;
  message: Message ={
    userId: '',
    userName: '',
    message: '',
    creationDate: ''
  }
  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private sharedService: SharedService,
    private dogsService: DogsService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getDogInfo();
    this.getDogMessages();
  }

  getDogInfo(){
    this.dogsService.getDog(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data) => {
      console.log(data.payload.id);
      if (data.payload.id){
        this.dog = data.payload.data();
        this.dog.id = data.payload.id;
        this.usersService.getUser(this.dog.userId).subscribe((user) => {
          this.user = user.payload.data();
      })
      }
    });
  }

  getDogMessages(){
    this.dogsService.getDogMessages(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(data => {
      this.dog.messages = data.map(e => {
        return e.payload.doc.data()
      })
    });
  }
  sendMessage(){
    this.usersService.getUser(this.usersService.currentUser.uid).subscribe((user) => {
      this.message.creationDate = moment(new Date()).format("YYYYMMDDHHmmss");
      this.message.userId = user.payload.id;
      this.message.userName = user.payload.data()['name'];
      this.message.messageDate = moment(new Date()).format("DD/MM/YYYY") + ' ' + moment(new Date()).format("HH:mm");
      this.dogsService.createDogMessage(this.dog, this.message);
      this.initializeMessage()
    })
  }

  async deleteDogConfirm(dog: Dog){
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Perro',
      message: '¿Seguro que deseas eliminar el perro?',
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
            this.deleteDog(dog);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteDog(dog: Dog){
    this.dogsService.deleteDog(dog.id);
    this.router.navigateByUrl('/tabs');
  }

  goBack(){
    this.router.navigateByUrl('/tabs');
  }

  initializeMessage(){
    this.message ={
      userId: '',
      userName: '',
      message: '',
      creationDate: ''
    }
  }

  initializeDog(){
    this.dog ={
      id: '',
      userId: '',
      name: '',
      lostDate: '',
      lostHour: '',
      lostArea: '',
      creationDate: ''
    }
  }
}

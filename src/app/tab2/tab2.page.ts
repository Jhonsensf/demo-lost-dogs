import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Dog } from '../models/dog';
import { SharedService } from '../services/shared/shared.service';
import { DogsService } from '../services/dogs/dogs.service';
import { UsersService } from '../services/users/users.service';
import { throttleTime } from 'rxjs/operators';
import { getOverlay } from '@ionic/core/dist/types/utils/overlays';
import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  dog: Dog;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private dogsService: DogsService,
    private usersService: UsersService
  ) {}

  ngOnInit(){
    this.initializeInput()
  }

  initializeInput(){
    this.dog = {
      id: '',
      name: '',
      lostArea: '',
      lostDate: '',
      lostHour: '',
      userId: '',
      creationDate: ''
    }
  }

  saveDog(dog: Dog){
    dog.lostDate = this.sharedService.formatDate(dog.lostDate);
    dog.lostHour = this.sharedService.formatHour(dog.lostHour);
    dog.userId = this.usersService.currentUser.uid;
    dog.creationDate = moment(new Date()).format("YYYYMMDDHHmmss");
    this.dogsService.creatDog(dog);
    this.initializeInput();
    this.router.navigateByUrl('/tabs');
  }
}

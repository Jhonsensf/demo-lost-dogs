import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'

import { Dog } from '../models/dog'
import { DogsService } from '../services/dogs/dogs.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  dogs: Dog[]
  constructor(
    private dogsService: DogsService
  ) {}

  ngOnInit(){
    this.dogsService.getDogs().subscribe(data => {
 
      this.dogs = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          lostDate: e.payload.doc.data()['lostDate'],
          lostHour: e.payload.doc.data()['lostHour'],
          lostArea: e.payload.doc.data()['lostArea'],
          creationDate: e.payload.doc.data()['creationDate']
        };
      })
    });
  }
}

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DogDetailsPage } from './dog-details.page';

describe('DogDetailsPage', () => {
  let component: DogDetailsPage;
  let fixture: ComponentFixture<DogDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

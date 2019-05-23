import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToProjectPage } from './add-user-to-project.page';

describe('AddUserToProjectPage', () => {
  let component: AddUserToProjectPage;
  let fixture: ComponentFixture<AddUserToProjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserToProjectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserToProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

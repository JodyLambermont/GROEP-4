import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveUserFromProjectPage } from './remove-user-from-project.page';

describe('RemoveUserFromProjectPage', () => {
  let component: RemoveUserFromProjectPage;
  let fixture: ComponentFixture<RemoveUserFromProjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveUserFromProjectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveUserFromProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

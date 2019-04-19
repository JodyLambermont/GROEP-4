import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeWorkweekPage } from './change-workweek.page';

describe('ChangeWorkweekPage', () => {
  let component: ChangeWorkweekPage;
  let fixture: ComponentFixture<ChangeWorkweekPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeWorkweekPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeWorkweekPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

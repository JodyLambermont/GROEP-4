import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantdetailPage } from './consultantdetail.page';

describe('ConsultantdetailPage', () => {
  let component: ConsultantdetailPage;
  let fixture: ComponentFixture<ConsultantdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantdetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

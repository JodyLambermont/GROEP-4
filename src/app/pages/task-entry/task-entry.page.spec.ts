import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEntryPage } from './task-entry.page';

describe('TaskEntryPage', () => {
  let component: TaskEntryPage;
  let fixture: ComponentFixture<TaskEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskEntryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

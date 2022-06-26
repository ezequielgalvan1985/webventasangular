/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ComboFlexComponent } from './combo-flex.component';

describe('ComboFlexComponent', () => {
  let component: ComboFlexComponent;
  let fixture: ComponentFixture<ComboFlexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboFlexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboFlexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

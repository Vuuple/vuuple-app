import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterRegisterComponent } from './renter-register.component';

describe('RenterRegisterComponent', () => {
  let component: RenterRegisterComponent;
  let fixture: ComponentFixture<RenterRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenterRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenterRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

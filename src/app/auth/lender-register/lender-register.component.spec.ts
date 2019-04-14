import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderRegisterComponent } from './lender-register.component';

describe('LenderRegisterComponent', () => {
  let component: LenderRegisterComponent;
  let fixture: ComponentFixture<LenderRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenderRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

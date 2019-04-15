import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterationCompletedComponent } from './registeration-completed.component';

describe('RegisterationCompletedComponent', () => {
  let component: RegisterationCompletedComponent;
  let fixture: ComponentFixture<RegisterationCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterationCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterationCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

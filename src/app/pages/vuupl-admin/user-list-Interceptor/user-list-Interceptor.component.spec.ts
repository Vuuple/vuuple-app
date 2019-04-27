import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlistInterceptorComponent } from './user-list-Interceptor.component';

describe('UserlistInterceptorComponent', () => {
  let component: UserlistInterceptorComponent;
  let fixture: ComponentFixture<UserlistInterceptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserlistInterceptorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlistInterceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

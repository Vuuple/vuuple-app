import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpointComponent } from './addpoint.component';

describe('AddpointComponent', () => {
  let component: AddpointComponent;
  let fixture: ComponentFixture<AddpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualRenterComponent } from './individual-renter.component';

describe('IndividualRenterComponent', () => {
  let component: IndividualRenterComponent;
  let fixture: ComponentFixture<IndividualRenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualRenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

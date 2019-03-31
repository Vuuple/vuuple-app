import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRenterComponent } from './company-renter.component';

describe('CompanyRenterComponent', () => {
  let component: CompanyRenterComponent;
  let fixture: ComponentFixture<CompanyRenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

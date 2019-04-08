import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowDetailsComponent } from './escrow-details.component';

describe('EscrowDetailsComponent', () => {
  let component: EscrowDetailsComponent;
  let fixture: ComponentFixture<EscrowDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

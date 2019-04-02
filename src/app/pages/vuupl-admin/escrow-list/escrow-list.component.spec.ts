import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowListComponent } from './escrow-list.component';

describe('EscrowListComponent', () => {
  let component: EscrowListComponent;
  let fixture: ComponentFixture<EscrowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

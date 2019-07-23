import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenRequestDetailsComponent } from './token-request-details.component';

describe('TokenRequestDetailsComponent', () => {
  let component: TokenRequestDetailsComponent;
  let fixture: ComponentFixture<TokenRequestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenRequestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

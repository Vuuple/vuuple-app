import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenRequestListComponent } from './token-request-list.component';

describe('TokenRequestListComponent', () => {
  let component: TokenRequestListComponent;
  let fixture: ComponentFixture<TokenRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

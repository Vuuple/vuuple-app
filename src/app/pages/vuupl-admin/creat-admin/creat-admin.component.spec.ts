import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatAdminComponent } from './creat-admin.component';

describe('CreatAdminComponent', () => {
  let component: CreatAdminComponent;
  let fixture: ComponentFixture<CreatAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

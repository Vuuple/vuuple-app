import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaftManageComponent } from './raft-manage.component';

describe('RaftManageComponent', () => {
  let component: RaftManageComponent;
  let fixture: ComponentFixture<RaftManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaftManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaftManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

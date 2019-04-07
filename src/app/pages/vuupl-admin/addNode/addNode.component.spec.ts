import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNodeComponent } from './addNode.component';

describe('addNodeComponent', () => {
  let component: AddNodeComponent;
  let fixture: ComponentFixture<AddNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNodeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

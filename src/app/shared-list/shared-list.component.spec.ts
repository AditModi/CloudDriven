import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedListComponent } from './shared-list.component';

describe('SharedListComponent', () => {
  let component: SharedListComponent;
  let fixture: ComponentFixture<SharedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

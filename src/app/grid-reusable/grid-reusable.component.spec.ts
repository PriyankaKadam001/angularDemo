import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridReusableComponent } from './grid-reusable.component';

describe('GridReusableComponent', () => {
  let component: GridReusableComponent;
  let fixture: ComponentFixture<GridReusableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridReusableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridReusableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

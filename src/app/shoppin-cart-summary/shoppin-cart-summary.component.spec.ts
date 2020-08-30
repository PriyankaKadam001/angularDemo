import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinCartSummaryComponent } from './shoppin-cart-summary.component';

describe('ShoppinCartSummaryComponent', () => {
  let component: ShoppinCartSummaryComponent;
  let fixture: ComponentFixture<ShoppinCartSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppinCartSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinCartSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

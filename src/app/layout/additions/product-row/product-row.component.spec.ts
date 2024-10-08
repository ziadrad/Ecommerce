import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRowComponent } from './product-row.component';

describe('ProductRowComponent', () => {
  let component: ProductRowComponent;
  let fixture: ComponentFixture<ProductRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

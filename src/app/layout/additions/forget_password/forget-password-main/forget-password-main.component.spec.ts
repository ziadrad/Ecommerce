import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordMainComponent } from './forget-password-main.component';

describe('ForgetPasswordMainComponent', () => {
  let component: ForgetPasswordMainComponent;
  let fixture: ComponentFixture<ForgetPasswordMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetPasswordMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgetPasswordMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

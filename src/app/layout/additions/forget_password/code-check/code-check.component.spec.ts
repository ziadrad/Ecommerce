import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeCheckComponent } from './code-check.component';

describe('CodeCheckComponent', () => {
  let component: CodeCheckComponent;
  let fixture: ComponentFixture<CodeCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

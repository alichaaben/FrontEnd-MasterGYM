import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsColumnComponent } from './testimonials-column.component';

describe('TestimonialsColumnComponent', () => {
  let component: TestimonialsColumnComponent;
  let fixture: ComponentFixture<TestimonialsColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestimonialsColumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestimonialsColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

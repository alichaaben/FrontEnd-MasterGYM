import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestTrainerComponent } from './best-trainer.component';

describe('BestTrainerComponent', () => {
  let component: BestTrainerComponent;
  let fixture: ComponentFixture<BestTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BestTrainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BestTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

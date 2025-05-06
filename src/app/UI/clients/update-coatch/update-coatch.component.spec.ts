import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCoatchComponent } from './update-coatch.component';

describe('UpdateCoatchComponent', () => {
  let component: UpdateCoatchComponent;
  let fixture: ComponentFixture<UpdateCoatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCoatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCoatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

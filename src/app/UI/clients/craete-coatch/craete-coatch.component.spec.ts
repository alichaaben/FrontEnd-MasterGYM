import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraeteCoatchComponent } from './craete-coatch.component';

describe('CraeteCoatchComponent', () => {
  let component: CraeteCoatchComponent;
  let fixture: ComponentFixture<CraeteCoatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CraeteCoatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CraeteCoatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

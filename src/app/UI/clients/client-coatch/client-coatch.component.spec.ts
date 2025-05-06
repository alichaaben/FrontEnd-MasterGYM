import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCoatchComponent } from './client-coatch.component';

describe('ClientCoatchComponent', () => {
  let component: ClientCoatchComponent;
  let fixture: ComponentFixture<ClientCoatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientCoatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientCoatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionRegistroComponent } from './confirmacion-registro.component';

describe('ConfirmacionRegistroComponent', () => {
  let component: ConfirmacionRegistroComponent;
  let fixture: ComponentFixture<ConfirmacionRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmacionRegistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmacionRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

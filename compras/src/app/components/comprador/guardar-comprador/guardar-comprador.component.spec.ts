import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarCompradorComponent } from './guardar-comprador.component';

describe('GuardarCompradorComponent', () => {
  let component: GuardarCompradorComponent;
  let fixture: ComponentFixture<GuardarCompradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuardarCompradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardarCompradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

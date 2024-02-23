import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCompradorComponent } from './login-comprador.component';

describe('LoginCompradorComponent', () => {
  let component: LoginCompradorComponent;
  let fixture: ComponentFixture<LoginCompradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginCompradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginCompradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

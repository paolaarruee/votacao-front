import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPautaComponent } from './register-pauta.component';

describe('RegisterPautaComponent', () => {
  let component: RegisterPautaComponent;
  let fixture: ComponentFixture<RegisterPautaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPautaComponent]
    });
    fixture = TestBed.createComponent(RegisterPautaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPautaComponent } from './filtro-pauta.component';

describe('FiltroPautaComponent', () => {
  let component: FiltroPautaComponent;
  let fixture: ComponentFixture<FiltroPautaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroPautaComponent]
    });
    fixture = TestBed.createComponent(FiltroPautaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPautasComponent } from './lista-pautas.component';

describe('ListaPautasComponent', () => {
  let component: ListaPautasComponent;
  let fixture: ComponentFixture<ListaPautasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPautasComponent]
    });
    fixture = TestBed.createComponent(ListaPautasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

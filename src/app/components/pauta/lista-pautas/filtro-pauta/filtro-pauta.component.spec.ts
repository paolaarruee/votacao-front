import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroPautaComponent } from './filtro-pauta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriaPauta } from 'src/app/shared/interfaces/pauta';
import { By } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

describe('FiltroPautaComponent', () => {
  let component: FiltroPautaComponent;
  let fixture: ComponentFixture<FiltroPautaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroPautaComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroPautaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com um campo de categoria vazio', () => {
    const categoriaControl = component.filtrosPauta.get('categoria');
    expect(categoriaControl).toBeTruthy();
    expect(categoriaControl!.value).toBe('');
  });

  it('deve emitir o evento de filtro quando o valor do formulário mudar', () => {
    spyOn(component.filtrar, 'emit');

    const categoriaControl = component.filtrosPauta.get('categoria');
    categoriaControl!.setValue(CategoriaPauta.CATEGORIA_1);

    expect(component.filtrar.emit).toHaveBeenCalledWith({
      categoria: CategoriaPauta.CATEGORIA_1,
    });
  });

  it('deve chamar unsubscribe ao destruir o componente', () => {
    const subscriptionMock = jasmine.createSpyObj('Subscription', [
      'unsubscribe',
    ]);
    component['filterChanges$'] = subscriptionMock;

    component.ngOnDestroy();

    expect(subscriptionMock.unsubscribe).toHaveBeenCalled();
  });
});

import { TestBed } from '@angular/core/testing';
import { VotosComponent } from './votos.component';
import { VotoService } from 'src/app/core/services/voto/voto.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';



describe('VotosComponent', () => {
  let component: VotosComponent;
  let votoService: VotoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VotosComponent],
      imports: [HttpClientTestingModule],
      providers: [
        VotoService,
        { provide: MAT_DIALOG_DATA, useValue: { id: 1 } },
      ],
    }).compileComponents();

    votoService = TestBed.inject(VotoService);
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(VotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve enviar voto quando onSubmit for chamado', () => {
    spyOn(votoService, 'enviarVoto').and.returnValue(
      of({ opcao: 'sim', sessaoId: 1, userCpf: '111111111', id: 1 })
    );

    component.registerVoto.patchValue({ opcao: 'sim' });
    component.onSubmit();

    expect(votoService.enviarVoto).toHaveBeenCalledWith(1, 'sim');
  });

  // it('deve renderizar corretamente', async () => {
  //   await render(VotosComponent, {
  //     componentProperties: {
  //       data: { id: 1 },
  //     },
  //   });

  //   expect(screen.getByText('Votar')).toBeTruthy();
  //   expect(screen.getByText('SIM')).toBeTruthy();
  //   expect(screen.getByText('NÃO')).toBeTruthy();
  // });
});

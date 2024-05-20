import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { VotoService } from 'src/app/core/services/voto/voto.service';
import { VotosComponent } from './votos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('VotosComponent', () => {
  let component: VotosComponent;
  let votoService: VotoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VotosComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
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
    const userCpf = '111111111';
    spyOn(votoService, 'enviarVoto').and.returnValue(
      of({ opcao: 'sim', sessaoId: 1, userCpf: userCpf, id: 1 })
    );

    component.registerVoto.patchValue({ opcao: 'sim', userCpf: userCpf });
    component.onSubmit();

    expect(votoService.enviarVoto).toHaveBeenCalledWith(1, {
      opcao: 'sim',
      userCpf: userCpf,
    });
  });
});

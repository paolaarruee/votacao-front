import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusaoPautaComponent } from './exclusao-pauta.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('ExclusaoPautaComponent', () => {
  let component: ExclusaoPautaComponent;
  let fixture: ComponentFixture<ExclusaoPautaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExclusaoPautaComponent],
      imports: [MatDialogModule],
    });
    fixture = TestBed.createComponent(ExclusaoPautaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

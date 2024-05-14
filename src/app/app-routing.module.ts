import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPautasComponent } from './components/pauta/lista-pautas/lista-pautas.component';
import { RegisterPautaComponent } from './components/pauta/register-pauta/register-pauta.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'entrar', component: LoginComponent },
  // { path: 'cadastrar', component: RegisterUser },
  { path: 'cadastrar-pauta', component: RegisterPautaComponent },
  { path: 'lista-pautas', component: ListaPautasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

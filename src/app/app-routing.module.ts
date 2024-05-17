import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPautasComponent } from './components/pauta/lista-pautas/lista-pautas.component';
import { RegisterPautaComponent } from './components/pauta/register-pauta/register-pauta.component';
import { HomeComponent } from './components/pauta/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterUsersComponent } from './components/user/register-users/register-users.component';
import { AuthGuard } from './core/guards/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'entrar', component: LoginComponent },
  { path: 'cadastrar', component: RegisterUsersComponent },
  { path: 'cadastrar-pauta', component: RegisterPautaComponent },
  { path: 'lista-pautas', component: ListaPautasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

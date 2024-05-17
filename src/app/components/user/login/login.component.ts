import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Users } from 'src/app/shared/interfaces/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    cpf: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const data: Users = {
        cpf: this.loginForm.get('cpf')!.value!,
        senha: this.loginForm.get('senha')!.value!,
      };

      this.authService.login(data).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Login error', err),
      });
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../_core/services/auth.service';
import { AlertComponent } from '../../../../../shared/components/alert/alert.component';
import { AlertService } from '../../../../../_core/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false,
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
     private alert: AlertService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;

    }

    this.register();
  }
  register() {
    console.log('Datos de registro:', this.registerForm.value);
    this.authService.register(Object.assign(this.registerForm.value, {roleId: 1})).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.alert.success('Registro exitoso', 'success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        this.alert.error('Error en el registro', 'danger');
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Getters para acceso fácil a los controles del formulario
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
}
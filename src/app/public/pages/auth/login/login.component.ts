
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../_core/services/auth.service';
import { AlertComponent } from '../../../../../shared/components/alert/alert.component';
import { AlertService } from '../../../../../_core/services/alert.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  rememberMe = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alert: AlertService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      
      console.log('Datos de login:', this.loginForm.value);
      
      // Simulamos una petición
   
      this.login();
    }
  }
  login(){
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {

        console.log('Login exitoso:', response);
        this.alert.success('Login exitoso', 'success',);
        this.router.navigate(['']);
      }
      , error: (error) => {
        console.error('Error en el login:', error);
        this.alert.error('Error en el login', 'danger'); 
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  forgotPassword() {
    // Lógica para recuperar contraseña
    console.log('Forgot password clicked');
  }

  // Getters para acceso fácil a los controles del formulario
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
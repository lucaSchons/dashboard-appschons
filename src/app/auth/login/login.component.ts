import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
 
  constructor(private authService: AuthService){ }

  onSubmit() {
    this.authService.login({
      email: this.userForm.value.email,
      password: this.userForm.value.password
    });
  }
}

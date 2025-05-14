import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent {
  //use reactive forms

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  // for printing
  /*
    <h2>Profile Form</h2><p>Name: {{ profileForm.value.name }}</p><p>Email: {{ profileForm.value.email }}</p>
  */

  signIn() {}
}

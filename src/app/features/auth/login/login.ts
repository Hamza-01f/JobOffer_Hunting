import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { authService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit{


  loginForm!: FormGroup;
  loginError = '';

  constructor(
    private auth: authService,
    private router: Router,
    private fb: FormBuilder
  ){}


  submit(){

     if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
     }

     const {email , password} = this.loginForm.value;

     this.auth.lgoInUser(email , password).subscribe( users => {
      if(users.length === 0){
        this.loginError = 'Email or password are incorrect';
        return;
      }



      const user = users[0];
      const { password: _, ...safeUser } = user;

      sessionStorage.setItem('user',JSON.stringify(safeUser));
      this.router.navigate(['/'])

     });
     

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
       email: ['' , [Validators.email ,  Validators.required]],
       password: ['' , [Validators.required]]
  });

  }

}

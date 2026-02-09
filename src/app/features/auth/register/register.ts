import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { authService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register  implements OnInit{


  RegisterForm!: FormGroup;

  constructor(
    private auth: authService,
    private rout: Router,
    private fb: FormBuilder
  ){}

  register(){
    if(this.RegisterForm.invalid){
      this.RegisterForm.markAllAsTouched();
      return;
    }

    const user = this.RegisterForm.value;

    this.auth.checkEmail(user.email).subscribe(existing => {

        if(existing.length > 0 ){
          this.RegisterForm.get('email')?.setErrors({emailExists : true});
          return;
        }

        this.auth.registerUser(user).subscribe({
        next: () => {
            this.rout.navigate(['/login']);
        },
        error: err => {
          console.log(err); 
        }
       
        });

    
    });


  }

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm(){
    this.RegisterForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


}

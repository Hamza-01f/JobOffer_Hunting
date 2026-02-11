import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { authService } from '../../../core/auth/auth.service';
import { Login } from '../../../features/auth/login/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(
    public auth: authService,
    private router: Router
  ){}

  logout(){
    this.auth.logout();
  }

  login(){
      this.router.navigate(['/login'])
  }

  register(){
      this.router.navigate(['/register'])
  }

}

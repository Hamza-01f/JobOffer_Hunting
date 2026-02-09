import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { authService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {


  constructor(
    private auth: authService,
  ){}

  logout(){
     this.auth.logout();
  }
}

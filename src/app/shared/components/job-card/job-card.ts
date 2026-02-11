import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { authService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-job-card',
  imports: [CommonModule],
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss',
})
export class JobCard {

  @Input() job!: any;


  constructor(public authservice: authService){
    this.authservice.isAuthenticated();
  }
}

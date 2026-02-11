import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { authService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-job-card',
  imports: [CommonModule],
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss',
})
export class JobCard {

  @Input() job!: any;
  @Output() apply = new EventEmitter<any>();
  @Input() alreadyApplied = false;

  constructor(public authservice: authService){
    this.authservice.isAuthenticated();
  }

  onApply(){
      this.apply.emit(this.job);
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Job } from '../../../core/model/job.model';

@Component({
  selector: 'app-job-card',
  imports: [CommonModule],
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss',
})
export class JobCard {

  @Input() job!: any;

}

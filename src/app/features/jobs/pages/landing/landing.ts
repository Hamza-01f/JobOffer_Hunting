import { Component, OnInit } from '@angular/core';
import { Header } from '../../../../shared/header/header';
import { Footer } from '../../../../shared/footer/footer';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Job } from '../../../../core/model/job.model';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-landing',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing implements OnInit{

  jobs: Job[] = [];
  isLoading = false;


  constructor(
    private jobsService: JobsService
  ){}

  ngOnInit(): void {
    this.loadOffers();
  }

loadOffers(){
  this.isLoading = true;

  this.jobsService.getJobs().subscribe({
    next: data => {
      this.jobs = data.results;
      this.isLoading = false;
    },
    error: err => {
      console.error(err);
      this.isLoading = false;
    }
  });
}

}

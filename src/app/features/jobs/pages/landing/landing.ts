import { Component, OnInit } from '@angular/core';
import { Header } from '../../../../shared/header/header';
import { Footer } from '../../../../shared/footer/footer';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Job } from '../../../../core/model/job.model';
import { JobsService } from '../../services/jobs.service';
import { JobCard } from '../../../../shared/components/job-card/job-card';
import { Pagination } from '../../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-landing',
  imports: [CommonModule,ReactiveFormsModule,JobCard,Pagination],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing implements OnInit{

  jobs: any[] = [];
  isLoading = false;
  currentPage = 0;
  totalPages = 0;


  constructor(
    private jobsService: JobsService
  ){}

  ngOnInit(): void {
    this.loadOffers(0);
  }

loadOffers(page: number = 0){
  this.isLoading = true;

  this.jobsService.getJobs(page).subscribe({
    next: data => {
      this.jobs = data.results;
      this.currentPage = data.page;
      this.totalPages = data.page_count;
      this.isLoading = false;
    },
    error: err => {
      console.error(err);
      this.isLoading = false;
    }
  });
}

}

import { Component, OnInit } from '@angular/core';
import { Header } from '../../../../shared/pages/header/header';
import { Footer } from '../../../../shared/pages/footer/footer';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Job } from '../../../../core/model/job.model';
import { JobsService } from '../../services/jobs.service';
import { JobCard } from '../../../../shared/components/job-card/job-card';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { Search } from '../../../../shared/components/search/search';

@Component({
  selector: 'app-landing',
  imports: [CommonModule,ReactiveFormsModule,JobCard,Pagination,Search],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing implements OnInit{

  jobs: any[] = [];
  isLoading = false;
  currentPage = 0;
  totalPages = 0;
  keyword = '';
  level = '';



  constructor(
    private jobsService: JobsService
  ){}


  onSearch(filters: {keyword: string , level: string}){
       this.keyword = filters.keyword;
       this.level = filters.level;

       this.loadOffers(0)
  }
  ngOnInit(): void {
    this.loadOffers(0);
  }

  loadOffers(page: number = 0){
    this.isLoading = true;

    const request$ = (this.keyword || this.level) 
                     ? this.jobsService.searchJobs(page , this.keyword , this.level) 
                     : this.jobsService.getJobs(page)

    request$.subscribe({
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

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
import { ApplicationService } from '../../services/application.service';
import { authService } from '../../../../core/auth/auth.service';
import { Application } from '../../../../core/model/application.model';

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
  userId: number;
  appliedOffersId = new Set<string>();



  constructor(
    private jobsService: JobsService,
    private applicationService: ApplicationService,
    private auth: authService
  ){
     const user = auth.getLoggedInUser();
     this.userId = user?.id;
  }
  
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


  onApplyJob(job: any){
      const app: Application = {
         userId: this.userId,
         offerId: String(job.id),
         apiSource: "adzuna",
         title: job.title || 'no title provided',
         company: job.company?.name || 'company not mentioned',
         location: job.locations?.[0]?.name || 'no location provided',
         url: job.refs?.landing_page || 'no location provided',
         status: 'en_attente',
         notes: "Candidature envoyée le 10/02/2025. Relancer dans 2 semaines.",
         dateAdded: new Date().toISOString(),
      };

      this.applicationService.create(app).subscribe(() => {
        this.appliedOffersId.add(String(job.id))
      })
  }


}

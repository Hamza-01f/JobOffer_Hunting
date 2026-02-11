import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { authService } from '../../../../core/auth/auth.service';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../../../core/model/application.model';

@Component({
  selector: 'app-application',
  imports: [CommonModule],
  templateUrl: './application.html',
  styleUrl: './application.scss',
})
export class ApplicationComponent implements OnInit {

  appliedOffersId = new Set<string>();
  userId: number;
  myApplications: Application[] = [];


  constructor(
    private authservice: authService,
    private applicationService: ApplicationService
  ){
    const user = authservice.getLoggedInUser();
    this.userId = user?.id;
  }

  loadMyOffers(){
     this.applicationService.getByUser(this.userId).subscribe(apps => {
       console.log(apps)
       this.appliedOffersId.clear();
       apps.forEach(a => this.appliedOffersId.add(a.offerId));
     });
  }

  ngOnInit(): void {
    this.loadMyOffers();
  }


  changeStatus(app: Application , status: Application['status']){
      this.applicationService.update(app.id! , { status }).subscribe(() => app.status = status);
  }

  updateNotes(app: Application , notes: string){
       this.applicationService.update(app.id! , {notes}).subscribe(() => app.notes = notes);
  }

  delete(app: Application){
    this.applicationService.delete(app.id!).subscribe(() => this.myApplications.filter( a => a.id !== app.id));
  }
}

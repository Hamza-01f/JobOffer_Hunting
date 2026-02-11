import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Application } from '../../../../core/model/application.model';
import { ApplicationService } from '../../services/application.service';
import { authService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application.html',
  styleUrl: './application.scss'
})
export class ApplicationComponent implements OnInit {

  myApplications: Application[] = [];
  userId!: number;

  constructor(
    private authService: authService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit() {

    const user = this.authService.getLoggedInUser();
    this.userId = user?.id;

    if (this.userId) {
      this.loadMyApplications();
    }
  }

  loadMyApplications() {
    this.applicationService.getByUser(this.userId)
      .subscribe(apps => {
        this.myApplications = apps;
      });
  }

  changeStatus(app: Application, status: Application['status']) {

    const updated: Application = {
      ...app,
      status
    };

    this.applicationService.update(app.id!, updated)
      .subscribe(() => {
        app.status = status;
      });
  }

  delete(app: Application) {
    this.applicationService.delete(app.id!)
      .subscribe(() => {
        this.myApplications =
          this.myApplications.filter(a => a.id !== app.id);
      });
  }

  getStatusLabel(status: Application['status']) {
    switch (status) {
      case 'en_attente': return 'En attente';
      case 'accepte': return 'Accepté';
      case 'refuse': return 'Refusé';
    }
  }

  getStatusClass(status: Application['status']) {
    return {
      'status-en-attente': status === 'en_attente',
      'status-accepte': status === 'accepte',
      'status-refuse': status === 'refuse'
    };
  }

  getPendingCount(){
    return this.myApplications.filter(m => m.status === 'en_attente').length;
  }

  getRefusedCount(){
    return this.myApplications.filter(m => m.status === 'refuse').length;
  }

  getTotalCount(){
    return this.myApplications.filter(m => m.status === 'accepte').length;
  }

  getAcceptedCount(){
    return this.myApplications.length;
  }
}

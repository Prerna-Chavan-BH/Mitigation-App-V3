import { Component, OnInit } from '@angular/core';
import { ServerStatusService } from '../../service/server-status.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-component',
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="showNotification">
      <p style="color: red;">Backend server is down!</p>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {

  showNotification = false;
  serverStatus: { backend: boolean; } | undefined;

  constructor(private serverStatusService: ServerStatusService) { }

  ngOnInit(): void {
    this.serverStatus = this.serverStatusService.getServerStatus();
    if (!this.serverStatus.backend) {
      this.showNotification = true;
    }
    setInterval(() => {
      this.serverStatus = this.serverStatusService.getServerStatus();
      if (!this.serverStatus.backend) {
        this.showNotification = true;
      } else {
        this.showNotification = false;
      }
    }, 60000); // Check every 60 seconds
  }

}
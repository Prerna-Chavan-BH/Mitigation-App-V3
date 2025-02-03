import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerStatusService {

  private backendStatus: boolean = false;
  private frontendStatus: boolean = false;

  constructor(private http: HttpClient) {
    this.checkBackendStatus();
    this.checkFrontendStatus();
  }

  checkBackendStatus(): void {
    console.log('Checking for backend server status...');
    this.http.get('http://localhost:3000/api/mitigations')
      .subscribe(response => {
        this.backendStatus = true;
      }, error => {
        console.log('Error checking for backend server status...');
        this.backendStatus = false;
        console.error('Backend server is down!');
      });
  }

  checkFrontendStatus(): void {
    // Since we're already running in the frontend, we can assume it's up
    this.frontendStatus = true;
  }

  getServerStatus(): { backend: boolean, frontend: boolean } {
    return { backend: this.backendStatus, frontend: this.frontendStatus };
  }

}
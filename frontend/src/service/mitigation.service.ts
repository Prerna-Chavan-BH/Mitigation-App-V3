import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class MitigationService {
  private apiUrl = 'http://localhost:3000/api/mitigations'; 

  constructor(private http: HttpClient) {}

  // Method to send data form frontend to the backend
  addMitigation(mitigation: any): Observable<any> {
    return this.http.post(this.apiUrl, mitigation);
  }

  // Fetch all mitigation entries
  getMitigations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //Delete mitigation
  deleteMitigation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // //updateMitigations
  // updateMitigation(mitigation: Mitigation): Observable<any> {
  //   mitigation.calculateAverages();
  //   return this.http.put(`${this.apiUrl}/mitigations/$`)
  // }
}

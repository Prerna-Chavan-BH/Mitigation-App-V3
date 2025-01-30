import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class MitigationService {
  private apiUrl = 'http://localhost:3000/api/mitigations'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  // Method to send form data to the backend
  addMitigation(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, data, { headers });
  }

  // Fetch all mitigation entries
  getMitigations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //Delete mitigation
  deleteMitigation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
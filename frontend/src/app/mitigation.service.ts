import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IdGeneratorService } from './mitigation-Idgenerator.service';

@Injectable({
  providedIn: 'root',
})

export class MitigationService {
  private apiUrl = 'http://localhost:3000/api/mitigations'; // Adjust the URL as needed

  constructor(private http: HttpClient, private idGeneratorService: IdGeneratorService) {}

  // Method to send form data to the backend
  addMitigation(mitigation: any): Observable<any> {
    // console.log('Generating id');
    // mitigation.mitigationId = this.idGeneratorService.getNextId();
    // console.log('Generated the id: ', mitigation.mitigationId);
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
}

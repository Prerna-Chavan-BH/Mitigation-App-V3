import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MitigationService{
    private apiUrl = 'http://localhost:3000/api/mitigations';

    constructor(private http: HttpClient) {}

    getMitigations(): Observable <any> {
        return this.http.get(this.apiUrl);
    }

    createMitigations(mitigation: any): Observable <any> {
        return this.http.post(this.apiUrl, mitigation);
    }

    deleteMitigations(id: number): Observable <any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
import { Component, OnInit } from "@angular/core";
// import { CreateMitigationDialogComponent } from "./mitigation.forms/create-mitigation-dialog.component.ts";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { response } from "express";
import { FormsModule } from "@angular/forms";
import { CreateMitigationDialogComponent } from "../mitigation.forms/create-mitigation-dialog.component";


export interface Mitigation {
  id: number;
  description: string;
  preMitigationScore: number;
  postMitigationScore: number;
  appliedOn: string;
  checked: boolean;
}

@Component({
  selector: 'app-mitigation-details',
  templateUrl: './mitigation.component.html',
  imports: [CommonModule, FormsModule, CreateMitigationDialogComponent],
  styleUrls: ['./mitigation.component.css']
})

export class MitigationComponent implements OnInit{
  mitigations: Mitigation[] = [];
  showForm = false;
  scores = [ 1, 2, 3, 4, 5];
  error: string | undefined;
  newMitigation: Mitigation = {
    id: 0,
    description: '',
    preMitigationScore: 0,
    postMitigationScore: 0,
    appliedOn: '',
    checked: false,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/mitigations').subscribe((response: any) => {
      this.mitigations = response;
    });
  }

  openForm(): void {
    this.showForm = true;
  }

  deleteMitigation(id: number): void {
    //add delete logic here
    this.http.delete(`http://localhost:3000/api/mitigations/${id}`).subscribe(() => {
      this.mitigations = this.mitigations.filter(mitigation => mitigation.id !== id);
    });
  }

  submitMitigation(newMitigation: any): void{
    console.log('Submit mitigation called');
    this.http.post('http://localhost:3000/api/mitigations', newMitigation)
    .subscribe((response: any) => {
      console.log(response);
      this.ngOnInit();         //call ngOnInit to refresh the list of mitigations
    }, (error: any) => {
      console.error("Error sunmitting the mitigation",error);
      this.error = error.error.message;
    });
  }
}
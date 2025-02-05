import { Component, OnInit } from "@angular/core";
// import { CreateMitigationDialogComponent } from "./mitigation.forms/create-mitigation-dialog.component.ts";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { response } from "express";
import { FormsModule } from "@angular/forms";
import { CreateMitigationDialogComponent } from "../mitigation.forms/create-mitigation-dialog.component";
import { IdGeneratorService } from '../../service/mitigation-Idgenerator.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { MitigationService } from "../../service/mitigation.service";

export interface Mitigation {
  mitigationId: number;
  description: string;
  pre_mitigation_score: number;
  post_mitigation_score: number;
  applied_on: string;
  checked: boolean;
  actios: boolean;
  editMode: boolean;
}

@Component({
  selector: 'app-mitigation-details',
  templateUrl: './mitigation.component.html',
  imports: [CommonModule, FormsModule, CreateMitigationDialogComponent, NgxPaginationModule],
  styleUrls: ['./mitigation.component.css']
})

export class MitigationComponent implements OnInit{
  mitigations: Mitigation[] = [];
  p = 1;
  showForm = false;
  scores = [ 1, 2, 3, 4, 5];
  error: string | undefined;
  serverDown = false;
  editMode = false;
  editedMitigation: any;

  newMitigation: Mitigation = {
    mitigationId: 0,
    description: '',
    pre_mitigation_score: 0,
    post_mitigation_score: 0,
    applied_on: '',
    checked: false,
    actios: false,
    editMode: false,
  };

  constructor(private http: HttpClient, private MitigationService: MitigationService) {}

  ngOnInit(): void {
    this.MitigationService.getMitigations().subscribe((response: any) => {
      this.mitigations = response;
    });
    this.checkServerStatus();
    this.loadMitigations();
  }

  loadMitigations(): void{
    this.http.get('http://localhost:3000/api/mitigations').subscribe((response: any) => {
      this.mitigations = response;
    }, (error: any) => {
      console.error('Error loading the mitigations: ', error);
    });
  }

  openForm(): void {
    this.showForm = true;
  }

  editMitigation(mitigation: Mitigation, event:any): void {
    event.stopPropagation();
    mitigation.editMode = true;
  }

  cancelEdit(mitigation: Mitigation): void {
    mitigation.editMode = false;
  }


  deleteMitigation(mitigationId: number): void {
    console.log(`Deleting mitigation with ID ${mitigationId}`);
    const url = `http://localhost:3000/api/mitigations/${mitigationId}`;
    console.log(`Delete URL: ${url}`);
    this.http.delete(url)
      .subscribe(
        (response) => {
          console.log(`Delete successful: ${response}`);
          this.mitigations = this.mitigations.filter(mitigation => mitigation.mitigationId !== mitigationId);
          alert('Mitigation deleted successfully!');
        },
        (error) => {
          console.error(`Error deleting mitigation: ${error}`);
          alert(`Error deleting the mitigation: ${error}`);
        }
      );
  }
  

  submitMitigation(newMitigation: any): void{
    // console.log('Submit mitigation called');
    this.http.post('http://localhost:3000/api/mitigations', newMitigation)
    .subscribe((response: any) => {
      console.log(response);
      alert('Mitigation created successfully!');
      // alert(`Mitigation submitted successfully!`);
      this.ngOnInit();         //call ngOnInit to refresh the list of mitigations
      this.showForm = false;
    }, (error: any) => {
      console.error("Error submitting the mitigation",error);
      this.error = error.error.message;
      alert(`Error submitting the mitigation!`);
    });
  }

  saveMitigation(mitigation: any) {
    if (mitigation && mitigation.mitigationId) {
      const updatedMitigation = {
        mitigationId: mitigation.mitigationId,
        description: mitigation.description,
        pre_mitigation_score: mitigation.pre_mitigation_score,
        post_mitigation_score: mitigation.post_mitigation_score
      };
  
      // Call the API to update the mitigation
      this.http.put(`http://localhost:3000/api/mitigations/${mitigation.mitigationId}`, updatedMitigation)
        .subscribe(response => {
          console.log(response);
          mitigation.editMode = false;
        }, error => {
          console.error(error);
        });
    } else {
      console.error('Mitigation object is undefined or missing mitigationId property');
    }
  }
  

  calculateAverageMitigationScore(): number{
    const totalScore = this.mitigations.reduce((acc, mitigation) => acc + mitigation.pre_mitigation_score + mitigation.post_mitigation_score, 0);
    return totalScore / (this.mitigations.length);
  }

  calculateAveragePreMitigationScore(): number {
    const totalScore = this.mitigations.reduce((acc, mitigation) => acc + mitigation.pre_mitigation_score, 0);
    return totalScore / (this.mitigations.length);
  }

  calculateAveragePostMitigationScore(): number {
    const totalScore = this.mitigations.reduce((acc, mitigation) => acc + mitigation.post_mitigation_score, 0);
    return totalScore / (this.mitigations.length);
  }

  checkServerStatus(): void {
    this.http.get('http://localhost:3000/api/mitigations').subscribe((response: any) => {
      console.log('Server is up!');
    }, (error: any) => {
      console.error('Server is down!');
      this.serverDown = true;
    });
  }
}
import { Component, OnInit, ChangeDetectorRef, ApplicationRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CreateMitigationDialogComponent } from "../mitigation.forms/create-mitigation-dialog.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { MitigationService } from "../../service/mitigation.service";

export interface Mitigation {
  mitigationId: number;
  description: string;
  pre_mitigation_score: number;
  post_mitigation_score: number;
  applied_on: string;
  checked: boolean;
  actions: boolean;
  editMode: boolean;
}

export interface Score{
  value: number;
  color: string;
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
    actions: false,
    editMode: false,
  };

  constructor(private http: HttpClient, private MitigationService: MitigationService) {}

  getColor(score: number | Score): string{
    if(typeof score === 'object'){
      return this.getColor(score.value);
    }  
      switch(score) {
      case 1: return ' #44ce1b';
      case 2: return ' #bbdb44';  
      case 3: return ' #f7e379';
      case 4: return ' #f2a134';  
      case 5: return ' #e51f1f';
      default: return 'grey';
    }
    
  }

  updateColor(event: any) {
    this.newMitigation.pre_mitigation_score = event;
    this.newMitigation.post_mitigation_score = event;
  }

  ngOnInit(): void {
    // this.MitigationService.getMitigations().subscribe((response: any) => {
    //   this.mitigations = response;
    // });
    this.checkServerStatus();
    this.loadMitigations();
  }

  loadMitigations(): void{
    this.MitigationService.getMitigations().subscribe((response: any) => {
      this.mitigations = response.sort((a: any,b: any) => a.mitigationId - b.mitigationId);
    }, (error: any) => {
      console.error('Error loading the mitigation: ', error);
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
    alert('Mitigation cancelled successfully:)')
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
      this.loadMitigations();
      this.showForm = false;
    }, (error: any) => {
      console.error("Error submitting the mitigation",error);
      this.error = error.error.message;
      alert(`Error submitting the mitigation!`);
    });
  }

  saveMitigation(mitigation: any) {
    mitigation.pre_mitigation_score = mitigation.pre_mitigation_score;
    mitigation.post_mitigation_score = mitigation.post_mitigation_score;

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
          alert('Mitigation saved and updated successfully:)')
          mitigation.editMode = false;
        }, error => {
          console.error(error);
        });
    } else {
      console.error('Mitigation object is undefined or missing mitigationId property');
    }
  }
  

  calculateAverageMitigationScore(): number {
    const totalScore = this.mitigations.reduce((acc, mitigation) => {
      const preMitigationScore = typeof mitigation.pre_mitigation_score === 'object' ? (mitigation.pre_mitigation_score as Score).value : mitigation.pre_mitigation_score;
      const postMitigationScore = typeof mitigation.post_mitigation_score === 'object' ? (mitigation.post_mitigation_score as Score).value : mitigation.post_mitigation_score;
      return acc + preMitigationScore + postMitigationScore;
    }, 0);
    return totalScore / (this.mitigations.length * 2);
  }
  
  calculateAveragePreMitigationScore(): number {
    const totalScore = this.mitigations.reduce((acc, mitigation) => {
      const preMitigationScore = typeof mitigation.pre_mitigation_score === 'object' ? (mitigation.pre_mitigation_score as Score).value : mitigation.pre_mitigation_score;
      return acc + preMitigationScore;
    }, 0);
    return totalScore / (this.mitigations.length);
  }
  
  calculateAveragePostMitigationScore(): number {
    const totalScore = this.mitigations.reduce((acc, mitigation) => {
      const postMitigationScore = typeof mitigation.post_mitigation_score === 'object' ? (mitigation.post_mitigation_score as Score).value : mitigation.post_mitigation_score;
      return acc + postMitigationScore;
    }, 0);
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
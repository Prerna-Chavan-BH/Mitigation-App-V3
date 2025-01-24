import { Component, Inject, OnInit, EventEmitter, Output, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
// import { MitigationComponent } from './mitigation.details/mitigation.component.ts';

@Component({
  selector: 'app-create-mitigation-dialog',
  templateUrl: './create-mitigation-dialog.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  styleUrls: ['./create.mitigation-dialog.component.css'],
})

export class CreateMitigationDialogComponent implements OnInit{
  @Output() onSubmit = new EventEmitter();
  @ViewChild('mitigationForm') mitigationForm: NgForm | undefined;
  // @ViewChild('mitigationForm', {static: true}) mitigationForm: NgForm;
  newMitigation= { description: '', preMitigationScore: '', postMitigationScore: '', appliedOn: ''};
  scores = [1, 2, 3, 4, 5];


  // newMitigation = {
  //   description: '',
  //   preMitigationScore: '',
  //   postMitigationScore: '',
  //   appliedOn: '',
  // };
  error: string | undefined;
  
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    console.log('MitigationForm rendered!')
  }

  //Submit the form and close the dialoge box
  submitMitigation(): void {
    this.http.post('http://localhost:3000/api/mitigations', this.newMitigation)
    .subscribe((response) => {
      console.log(response);
      this.newMitigation = { description: '', preMitigationScore: '', postMitigationScore: '', appliedOn: ''};
    });
  }

  isValidForm(): boolean {
    return this.newMitigation.description !== "" &&
    this.newMitigation.preMitigationScore !== "" &&
    this.newMitigation.postMitigationScore !== "" &&
    this.newMitigation.appliedOn !== "";
  }

  submitForm(): void{
    console.log('submit form called');
    const mitigation = this.mitigationForm?.value;
    this.onSubmit.emit(mitigation);
  }

  onSubmit(): void {
    const mitigation = this.mitigationForm?.value;
    this.appService.submitMitigation(mitigation).subscribe((response: any) => {
      console.log(response);
    },(error: any) => {
      console.log(error);
      this.error = error.error.message
    })
  }
}
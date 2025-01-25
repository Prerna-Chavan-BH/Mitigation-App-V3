import { Component, Inject, OnInit, EventEmitter, Output, ViewChild, enableProdMode} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
// import { MitigationComponent } from './mitigation.details/mitigation.component.ts';
import { MitigationService } from '../mitigation.service.js';
import { Mitigation } from '../mitigation.details/mitigation.component.js';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-create-mitigation-dialog',
  templateUrl: './create-mitigation-dialog.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  styleUrls: ['./create.mitigation-dialog.component.css'],
})

export class CreateMitigationDialogComponent implements OnInit{
  mitigation?: Mitigation;
  newMitigation= { description: '', preMitigationScore: '', postMitigationScore: '', appliedOn: ''};
  scores = [1, 2, 3, 4, 5];
  mitigationForm: FormGroup = new FormGroup({});
  error : string | undefined;


  // newMitigation = {
  //   description: '',
  //   preMitigationScore: '',
  //   postMitigationScore: '',
  //   appliedOn: '',
  // };
  
  constructor(private formBuilder: FormBuilder,
              private mitigationService: MitigationService,
              private httpClient: HttpClient,
              public dialog:  MatDialog){}

  ngOnInit(): void {
    this.mitigationForm = new FormGroup({
      description: new FormControl('', Validators.required),
      preMitigationScore: new FormControl('', Validators.required),
      postMitigationScore: new FormControl('', Validators.required),
      appliedOn: new FormControl('', Validators.required),
    })
    console.log('MitigationForm rendered!')
  }

  isValidForm(): boolean {
    return this.mitigationForm.value;
  }

  submitForm(event: Event): void{
    event.preventDefault();    //prevents the default form submissions
    console.log('submit form called');
    if(this.mitigationForm.valid){
      const mitigation = this.mitigationForm.value;
      this.onSubmit(mitigation);
    }
  }

  // onSubmit(mitigation: any): void {
  //   this.mitigationService.createMitigations(mitigation).subscribe((response: any) => {
  //     console.log(response);
  //   },(error: any) => {
  //     console.log(error);
  //     this.error = error.error.message;
  //   });
  // }

  onSubmit(f: NgForm) {
    console.log(f.value)
    const url = 'http://localhost:3000/api/mitigations';
    this.httpClient.post(url, f.value)
      .subscribe((response) => {
        this.ngOnInit(); //reload the table
      });
    this.dialog.closeAll();
  }
}
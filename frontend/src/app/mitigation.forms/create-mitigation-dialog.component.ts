import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { MitigationService } from '../mitigation.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-mitigation-dialog',
  templateUrl: './create-mitigation-dialog.component.html',
  styleUrls: ['./create.mitigation-dialog.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
})
export class CreateMitigationDialogComponent implements OnInit {
  mitigationForm: FormGroup = new FormGroup({});
  tableData: any[] = [];
  error: string | undefined;

  constructor(private fb: FormBuilder, private MitigationService: MitigationService) { }

  ngOnInit(): void {
    this.mitigationForm = this.fb.group({
      description: ['', Validators.required],
      pre_mitigation_score: ['', Validators.required],
      post_mitigation_score: ['', Validators.required],
      applied_on: ['', Validators.required],

    });
  }

  onSubmit(): void {
    console.log(this.mitigationForm.value);
    if (this.mitigationForm.valid) {
      this.MitigationService.addMitigation(this.mitigationForm.value).subscribe(
        (response) => {
          // Add the new data to the tableData array for UI display
          this.tableData.push(response);
          // // Reset the form
          // this.mitigationForm.reset();
        },
        (error) => {
          console.error('Error submitting form:', error);
          alert('Failed to submit form. Please try again.');
        }
      );
    } else {
      alert('Please fill out all fields.');
    }
  }
}
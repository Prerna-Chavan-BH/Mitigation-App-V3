import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-mitigation-dialog',
  standalone: true, // Standalone component declaration
  imports: [
    ReactiveFormsModule, // Enables formGroup and formControlName directives
    MatFormFieldModule, // Angular Material Form Fields
    MatInputModule, // Angular Material Input fields
    MatButtonModule, // Angular Material Buttons
  ],
  templateUrl: './create-mitigation-dialog.component.html',
  styleUrls: ['./create.mitigation-dialog.component.css'],
})

export class CreateMitigationDialogComponent {
  mitigationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initializing form with default values and validations
    this.mitigationForm = this.fb.group({
      description: ['', Validators.required],
      preMitigationScore: [null, [Validators.required, Validators.min(0)]],
      postMitigationScore: [null, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.mitigationForm.valid) {
      console.log("Form Submitted, mitigation created successfully",this.mitigationForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}

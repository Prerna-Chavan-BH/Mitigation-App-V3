// import { enableProdMode } from '@angular/core';
import { CreateMitigationDialogComponent } from './app/mitigation.forms/create-mitigation-dialog.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { MitigationComponent } from './app/mitigation.details/mitigation.component.js';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';

bootstrapApplication(MitigationComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,  
    ),
    {provide: CreateMitigationDialogComponent,
      useClass: CreateMitigationDialogComponent
    },
  ],
}).catch((err) => console.error("Error related to MitigationComponent in main.ts",err));

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, withFetch } from '@angular/common/http';
import { MitigationComponent } from './mitigation.details/mitigation.component.js';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CreateMitigationDialogComponent } from './mitigation.forms/create-mitigation-dialog.component';
import { AppComponent } from './app.components/app.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MitigationService } from '../service/mitigation.service.js';


@NgModule({
  declarations: [ MitigationComponent, CreateMitigationDialogComponent, AppComponent ],
  imports: [
    NgModule,
    MatTableModule,
    NgxPaginationModule,
    BrowserModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormField,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatSelectModule,
    RouterModule,
    MitigationService,
  ],
  providers: [{ provide: HttpClient, useClass: HttpClient, deps:[withFetch]}],  //not valid but still trying
  bootstrap: [ AppComponent ]
})

export class AppModule { }

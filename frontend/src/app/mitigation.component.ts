import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CreateMitigationDialogComponent } from './create-mitigation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-mitigation',
  standalone: true,
  imports: [  MatCheckboxModule, MatTableModule, MatButtonModule, MatDialogModule],
  templateUrl: './mitigation.component.html',
  styleUrls: ['./mitigation.component.css']
})

export class MitigationComponent {
  mitigations = new MatTableDataSource<any>(); // Holds the mitigation data, Mattabledatasource will do the data binding for the html code
  displayedColumns :string[] = ['id', 'description', 'preMitigationScore', 'postMitigationScore', 'appliedOn'];

  constructor(private dialog: MatDialog, private http: HttpClient) {
    this.fetchMitigations();
  }

  toggleAllSelection(event: any){
    console.log('Select all checkbox: ', event);
  }

  toggleSelection(row: any){
    console.log('Row checkbox: ', row);
  }

  fetchMitigations() {
    this.http.get('/api/mitigations').subscribe((data: any) => {
      this.mitigations.data = data;
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateMitigationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.post('/api/mitigations', result).subscribe((newMitigation: any) => {
          this.mitigations.data = [...this.mitigations.data, newMitigation];     //updating the data source
        });
      }
    });
  }

  deleteMitigation(id: number) {
    this.http.delete(`/api/mitigations/${id}`).subscribe(() => {
      this.mitigations.data = this.mitigations.data.filter((mitigation) => mitigation.id !== id);     //Remove deleted mitigation 
    });
  }
}

import { Component } from '@angular/core';
import { MitigationService } from './mitigation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-mitigation',
    standalone: true,                  // indicates that this is a standalone component
    imports: [CommonModule, FormsModule],  //This will fix the error i was getting in html file for *ngFor
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class MitigationComponent {
    mitigations = [
        {
            description : '',
            pre_mitigation_score: null,
            post_mitigation_score: null,
            applied_on: '',
            editable: false
        },
    ];

    scores = [1, 2, 3, 4, 5];
    avgPreMitigationScore: number = 0;
    avgPostMitigationScore: number = 0;

    //Enable/Disable row edits
    toggleEdit(mitigation: any): void{
        mitigation.editable = !mitigation.editable;

        if (mitigation.editable){
            mitigation.applied_on = new Date().toLocaleDateString('en-IN',{
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        }
    }

    //Calculate averages
    calculateAverages(): void{
        const preScores = this.mitigations
            .filter((m) => m.pre_mitigation_score !== null)
            .map((m) => m.pre_mitigation_score!);           //non-null assertion operator used
        const postScores = this.mitigations
            .filter((m) => m.post_mitigation_score !== null)
            .map((m) => m.post_mitigation_score!);         //non null assertion operator used

        this.avgPreMitigationScore = 
            preScores.length > 0 ?
            preScores.reduce((a, b) => a + b, 0)/ preScores.length : 0;
        this.avgPostMitigationScore = 
            postScores.length > 0 ?
            postScores.reduce((a, b) => a + b, 0)/ postScores.length : 0;
    }

    //Create mitigations
    createMitigations(): void {
        this.calculateAverages();
        console.log('Mitigation: ', this.mitigations);
    }
}
    
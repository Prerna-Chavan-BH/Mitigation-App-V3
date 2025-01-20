import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import this
import { MitigationComponent } from './mitigation.component'; // Import the component

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // Add this to imports
    MitigationComponent, // Add standalone component
  ],
  providers: [],
  bootstrap: [], // Use the standalone component as the bootstrap
})
export class AppModule {}

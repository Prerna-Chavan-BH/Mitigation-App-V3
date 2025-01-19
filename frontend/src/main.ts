import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/mitigation.config';
import { MitigationComponent } from './app/mitigation.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic()
  .bootstrapModule(MitigationComponent)
  .catch(err => console.error(err));
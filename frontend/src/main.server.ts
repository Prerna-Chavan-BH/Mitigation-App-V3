import { bootstrapApplication } from '@angular/platform-browser';
import { MitigationComponent } from './app/mitigation.component';
import { config } from './app/mitigation.config.server';

const bootstrap = () => bootstrapApplication(MitigationComponent, config);

export default bootstrap;

import { Routes } from '@angular/router';
import { EmailVerificationComponent } from './email-verification/email-verification.component';


export const VerificationRoutes: Routes = [
  { path: 'verify', component: EmailVerificationComponent }
];

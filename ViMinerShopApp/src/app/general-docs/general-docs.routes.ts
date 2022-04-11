import { Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { PrivacyComponent } from './privacy/privacy.component';


export const GeneralDocsRoutes: Routes = [
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'join', component: JoinUsComponent },
  { path: 'privacy', component: PrivacyComponent },
];


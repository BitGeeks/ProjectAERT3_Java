import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { GeneralDocsRoutes } from './general-docs.routes';
import { RouterModule } from '@angular/router';
import { SubNavigationComponent } from './sub-navigation/sub-navigation.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GeneralDocsRoutes),
    TranslateModule
  ],
  declarations: [
    DisclaimerComponent,
    AboutUsComponent,
    SubNavigationComponent,
    ContactUsComponent,
    JoinUsComponent,
    PrivacyComponent
  ],
  providers: [TranslatePipe]
})
export class GeneralDocsModule { }

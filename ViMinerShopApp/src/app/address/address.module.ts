import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewAddressComponent } from './add-new-address/add-new-address.component';
import { EditNewAddressComponent } from './edit-new-address/edit-new-address.component';
import { TranslatePipe } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [AddNewAddressComponent, EditNewAddressComponent],
  providers: [TranslatePipe]
})
export class AddressModule {
}

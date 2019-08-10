import { NgModule } from '@angular/core';
import {MatDialogModule, MatTooltipModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatDialogModule,
    MatTooltipModule
  ],
  exports: [
    MatDialogModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }

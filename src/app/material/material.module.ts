import { NgModule } from '@angular/core';
import {
  MatDialogModule,
  MatTooltipModule
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [],
  imports: [
    MatDialogModule,
    MatTooltipModule,
    DragDropModule
  ],
  exports: [
    MatDialogModule,
    MatTooltipModule,
    DragDropModule
  ]
})
export class MaterialModule { }

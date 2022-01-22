import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    ScrollingModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    ScrollingModule,
  ]
})
export class MaterialModule {  }

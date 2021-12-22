import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RomCategoryComponent } from './rom-category/rom-category.component';
import { RomComponent } from './rom/rom.component';
import { RouterModule } from '@angular/router';
import { RomListComponent } from './rom-list.component';

@NgModule({
  declarations: [
    RomListComponent,
    RomCategoryComponent,
    RomComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RomListComponent
      }
    ]),
    MatButtonModule,
    MatCardModule
  ]
})
export class RomListModule { }

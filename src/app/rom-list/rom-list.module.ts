import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips'; 
import {MatIconModule} from '@angular/material/icon'; 
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
    MatCardModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class RomListModule { }

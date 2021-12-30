import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RomCategoryComponent } from './rom-category/rom-category.component';
import { RomComponent } from './rom/rom.component';
import { RouterModule } from '@angular/router';
import { RomListComponent } from './rom-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RomCategoryEmptyComponent } from './rom-category-empty/rom-category-empty.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';

@NgModule({
  declarations: [
    RomListComponent,
    RomCategoryComponent,
    RomComponent,
    RomCategoryEmptyComponent,
    FilterBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RomListComponent
      }
    ]),
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonToggleModule
  ],
  providers: [
    { provide: Window, useValue: window }
  ]
})
export class RomListModule { }

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
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/rom-list/', '.json');
}

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
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      isolate: true,
      extend: true
    }),
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
export class RomListModule {
  constructor(translate: TranslateService) {
    translate.use(translate.store.currentLang)
		translate.store.onLangChange.subscribe(lang => translate.use(lang.lang))
  }
}

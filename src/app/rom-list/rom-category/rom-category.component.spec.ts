import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { RomCategoryEmptyComponent } from '../rom-category-empty/rom-category-empty.component';

import { RomCategoryComponent } from './rom-category.component';

describe('RomCategoryComponent', () => {
  let component: RomCategoryComponent;
  let fixture: ComponentFixture<RomCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        MatCardModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      declarations: [
        RomCategoryComponent,
        RomCategoryEmptyComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RomCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

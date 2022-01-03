import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { RomCategoryEmptyComponent } from './rom-category-empty.component';

describe('RomCategoryEmptyComponent', () => {
  let component: RomCategoryEmptyComponent;
  let fixture: ComponentFixture<RomCategoryEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        MatIconModule,
        MatCardModule
      ],
      declarations: [ RomCategoryEmptyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RomCategoryEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

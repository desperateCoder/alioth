import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RomListComponent } from './rom-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

describe('RomListComponent', () => {
  let component: RomListComponent;
  let fixture: ComponentFixture<RomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RomListComponent,
        FilterBarComponent
      ],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        MatButtonToggleModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        { provide: Window, useValue: window }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

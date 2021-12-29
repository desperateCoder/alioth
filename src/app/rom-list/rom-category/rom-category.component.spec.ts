import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RomCategoryComponent } from './rom-category.component';

describe('RomCategoryComponent', () => {
  let component: RomCategoryComponent;
  let fixture: ComponentFixture<RomCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RomCategoryComponent ]
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

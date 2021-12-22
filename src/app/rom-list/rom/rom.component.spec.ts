import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { RomComponent } from './rom.component';

describe('RomComponent', () => {
  let component: RomComponent;
  let fixture: ComponentFixture<RomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RomComponent ],
      imports: [
        MatCardModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

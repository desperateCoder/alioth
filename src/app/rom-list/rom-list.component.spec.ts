import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RomListComponent } from './rom-list.component';

describe('RomListComponent', () => {
  let component: RomListComponent;
  let fixture: ComponentFixture<RomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RomListComponent ],
      imports: [
        HttpClientTestingModule
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

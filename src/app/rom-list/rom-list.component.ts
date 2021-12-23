import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { fromEvent, map, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RomService } from './rom.service';

@Component({
  selector: 'app-rom-list',
  templateUrl: './rom-list.component.html',
  styleUrls: ['./rom-list.component.scss']
})
export class RomListComponent implements AfterViewInit, OnDestroy {

  private readonly unsubscribe$ = new Subject<void>()
  readonly criteriaForInclusionURL = environment.criteriaForInclusionURL
  readonly environment = environment
  readonly androidVersions = this.service.getAndroidVersions()

  @ViewChild('searchInput')
  searchInput!: ElementRef;

  constructor(
    public service: RomService
  ) { }

  ngAfterViewInit(): void {
    fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.unsubscribe$),
        map(event => event.target as HTMLInputElement),
        map(input => input.value)
      )
      .subscribe(value => this.service.setFilterTerm(value))
  }

  filterAndroidVersion(event: MatButtonToggleChange) {
    const toggle = event.source;
    if (toggle) {
        const group = toggle.buttonToggleGroup;
        if (event.value.some((item: any) => item == toggle.value)) {
            group.value = [toggle.value];
            this.service.setFilterAndroidVersion(group.value[0] || '')
        }
    } else {
      this.service.setFilterAndroidVersion('')
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}

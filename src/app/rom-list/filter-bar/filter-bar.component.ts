import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { fromEvent, map, Subject, takeUntil } from 'rxjs';
import { RomService } from '../rom.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements AfterViewInit, OnDestroy {

  private readonly unsubscribe$ = new Subject<void>()
  readonly androidVersions$ = this.service.getAndroidVersions()

  @ViewChild('searchInput')
  searchInput!: ElementRef;

  constructor(
    public readonly service: RomService
  ) { }

  ngAfterViewInit(): void {
    fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.unsubscribe$),
        map(event => event.target as HTMLInputElement),
        map(input => input.value)
      )
      .subscribe(value => this.service.setFilter('term', value))
  }

  filterAndroidVersion(event: MatButtonToggleChange) {
    const toggle = event.source;
    if (toggle) {
      const group = toggle.buttonToggleGroup;
      if (event.value.some((item: any) => item == toggle.value)) {
        group.value = [toggle.value];
        this.service.setFilter('androidVersion', group.value[0] || '')
      }
    } else {
      this.service.setFilter('androidVersion', '')
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}

import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { debounce, fromEvent, map, skip, Subject, takeUntil, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../schema';
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
    @Inject(Window) private readonly window: Window,
    public readonly service: RomService
  ) { }

  ngAfterViewInit(): void {
    fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.unsubscribe$),
        map(event => event.target as HTMLInputElement),
        map(input => input.value)
      )
      .subscribe(value => this.service.setFilterTerm(value))
    this.service.filterChanged$.pipe(
      takeUntil(this.unsubscribe$),
      skip(1),
      debounce(_ => timer(500))
    ).subscribe(() => {
      this.window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    })
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

  identifyCategory(_: number, item: Category) {
    return item.title
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}

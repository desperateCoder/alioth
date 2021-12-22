import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, map, Subject, takeUntil } from 'rxjs';
import { RomService } from './rom.service';

@Component({
  selector: 'app-rom-list',
  templateUrl: './rom-list.component.html',
  styleUrls: ['./rom-list.component.scss']
})
export class RomListComponent implements AfterViewInit, OnDestroy {

  private readonly unsubscribe$ = new Subject<void>()

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
      .subscribe(value => this.service.setFilter({term: value}))
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}

import { AfterViewInit, Component, Inject, OnDestroy } from '@angular/core';
import { debounceTime, map, skip, Subject, takeUntil } from 'rxjs';
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
  readonly environment = environment
  readonly filteredData$ = this.service.getFilteredData()

  constructor(
    @Inject(Window) private readonly window: Window,
    public readonly service: RomService
  ) { }

  ngAfterViewInit(): void {
    this.filteredData$.pipe(
      takeUntil(this.unsubscribe$),
      skip(1),
      map(_ => { }),
      debounceTime(500)
    ).subscribe(() => this.window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }))
  }

  identifyCategory(_: number, item: Category) {
    return item.title
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}

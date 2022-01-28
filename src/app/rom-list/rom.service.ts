import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, share, tap } from 'rxjs';
import { Category, Data } from '../schema';

@Injectable({
  providedIn: 'root'
})
export class RomService {

  private readonly filter$ = new BehaviorSubject<RomFilter>({
    term: '',
    androidVersion: '',
    pinned: false
  })
  private rawData$: null | Observable<Data> = null
  private filteredData$: null | Observable<Data> = null

  constructor(
    private readonly http: HttpClient
  ) { }

  private getRawData(): Observable<Data> {
    if (this.rawData$ === null) {
      this.rawData$ = this.http.get<Data>('assets/data.json')
        .pipe(
          tap(this.sortROMsAlphabetically),
          tap(this.sortROMsByPinStatus)
        )
    }

    return this.rawData$
  }

  private sortROMsAlphabetically(categories: Category[]) {
    categories.forEach(category => category.roms.sort((a, b) => {
      const lowerA = a.name.toLowerCase()
      const lowerB = b.name.toLowerCase()
      return lowerA < lowerB ? -1 : lowerA > lowerB ? 1 : 0
    }))
  }

  private sortROMsByPinStatus(categories: Category[]) {
    categories.forEach(category => category.roms.sort((a, b) => {
      return !a.pinned && b.pinned ? 1 : a.pinned && !b.pinned ? -1 : 0
    }))
  }

  public getAndroidVersions(): Observable<Set<string>> {
    return this.getRawData().pipe(
      map(data => {
        return new Set([...new Set(data
          .flatMap(category => category.roms)
          .flatMap(roms => roms.androidVersions))].sort())
      }),
      share()
    )
  }

  public getFilteredData(): Observable<Data> {
    if (this.filteredData$ === null) {
      this.filteredData$ = combineLatest([
        this.getRawData(),
        this.filter$
      ]).pipe(
        map(this.filterData),
        distinctUntilChanged(this.dataEquals),
        share()
      )
    }

    return this.filteredData$
  }

  private filterData([data, filter]: [Data, RomFilter]) {
    return data.map(category => {
      return {
        title: category.title,
        roms: category.roms
          .filter(rom => filter.pinned ? rom.pinned : true)
          .filter(rom => !!rom.androidVersions.find(version => version.toLocaleLowerCase().indexOf(filter.androidVersion) >= 0))
          .filter(rom =>
            rom.name
              .toLowerCase()
              .indexOf(filter.term) > -1 ||
            rom.links
              .map(link => link.text.toLowerCase())
              .some(lowerLinkText => lowerLinkText.indexOf(filter.term) > -1)
          )
      };
    });
  }

  private dataEquals(prev: Data, current: Data) {
    return prev.length === current.length &&
      prev.every((category, categoryIndex) => {
        return category.title === current[categoryIndex]?.title &&
          category.roms.length === current[categoryIndex].roms.length &&
          category.roms.every((rom, romIndex) => {
            return rom.name === current[categoryIndex]?.roms[romIndex]?.name
          })
      })
  }

  public setFilter<Property extends keyof RomFilter>(property: Property, value: RomFilter[Property]) {
    this.filter$.next({
      ...this.filter$.getValue(), [property]: (
        typeof value === 'string' ? value.toLowerCase() : value
      )
    })
  }

  public isFilteredBy<Property extends keyof RomFilter>(property: Property, value: RomFilter[Property]) {
    const lowerValue = typeof value === 'string' ? value.toLowerCase() : value
    return this.filter$.asObservable()
      .pipe(
        map(filter => typeof filter[property] === 'string' ? (filter[property] as string).toLowerCase() : filter[property]),
        map(property => property === lowerValue)
      )
  }
}

interface RomFilter {
  term: string
  androidVersion: string,
  pinned: boolean
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, share } from 'rxjs';
import { Data } from '../schema';

@Injectable({
  providedIn: 'root'
})
export class RomService {

  private readonly filter$ = new BehaviorSubject<RomFilter>({
    term: '',
    androidVersion: ''
  })
  private rawData$: null | Observable<Data> = null
  private filteredData$: null | Observable<Data> = null

  constructor(
    private readonly http: HttpClient
  ) { }

  private getRawData(): Observable<Data> {
    if (this.rawData$ === null) {
      this.rawData$ = this.http.get<Data>('assets/data.json')
    }

    return this.rawData$
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
    this.filter$.next({ ...this.filter$.getValue(), [property]: value.toLowerCase() })
  }
}

interface RomFilter {
  term: string
  androidVersion: string
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, filter, map, Observable, of, ReplaySubject, share, startWith, Subject, tap } from 'rxjs';
import { Category, Data } from '../schema';

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
    private http: HttpClient
  ) { }

  private getRawData(): Observable<Data> {
    if (this.rawData$ === null) {
      this.rawData$ = this.http.get<Data>('assets/data.json')
    }

    return this.rawData$
  }

  public getCategoryTitles(): Observable<string[]> {
    return this.getRawData().pipe(
      map(data => data.map(category => category.title))
    )
  }

  public getFilteredData(): Observable<Data> {
    if (this.filteredData$ === null) {
      this.filteredData$ = combineLatest([
        this.getRawData(),
        this.filter$
      ]).pipe(
        map(([data, filter]) => {
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
        })
      )
    }

    return this.filteredData$
  }

  public setFilterTerm(term: string) {
    this.filter$.next({...this.filter$.getValue(), term: term.toLowerCase()})
  }

  public setFilterAndroidVersion(androidVersion: string) {
    this.filter$.next({...this.filter$.getValue(), androidVersion: androidVersion.toLowerCase()})
  }
}

export interface RomFilter {
  term: string
  androidVersion: string
}
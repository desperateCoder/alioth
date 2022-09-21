import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Item } from 'src/app/schema';

@Component({
  selector: 'app-rom-category',
  templateUrl: './rom-category.component.html',
  styleUrls: ['./rom-category.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      state('in', style({ opacity: 1, transform: 'translateY(-1rem)' })),
      transition(':enter', [style({ opacity: '0', transform: 'translateY(0)' }), animate('.1s ease-out', style({ opacity: '1', transform: 'translateY(-1rem)' }))]),
      transition(':leave', [style({ opacity: '1', transform: 'translateY(-1rem)' }), animate('.1s ease-out', style({ opacity: '0', transform: 'translateY(0)' }))]),
    ]),
  ],
})
export class RomCategoryComponent {

  @Input()
  title: string = ''

  @Input()
  roms: Item[] = []

  identifyRom(_: number, item: Item) {
    return item.name;
  }

}

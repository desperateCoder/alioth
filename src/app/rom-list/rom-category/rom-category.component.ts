import { Component, Input } from '@angular/core';
import { Item } from 'src/app/schema';

@Component({
  selector: 'app-rom-category',
  templateUrl: './rom-category.component.html',
  styleUrls: ['./rom-category.component.scss']
})
export class RomCategoryComponent {

  @Input()
  title: string = ''

  @Input()
  roms: Item[] = []

}

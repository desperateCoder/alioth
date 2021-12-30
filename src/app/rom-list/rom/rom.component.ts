import { Component, Input } from '@angular/core';
import { Item, Link, Maintainer } from 'src/app/schema';

@Component({
  selector: 'app-rom',
  templateUrl: './rom.component.html',
  styleUrls: ['./rom.component.scss']
})
export class RomComponent {

  @Input()
  rom: Item | undefined
}

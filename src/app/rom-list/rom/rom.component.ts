import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Item, Link } from 'src/app/schema';

@Component({
  selector: 'app-rom',
  templateUrl: './rom.component.html',
  styleUrls: ['./rom.component.scss']
})
export class RomComponent implements OnChanges {

  telegramLinks: Link[] = []
  otherLinks: Link[] = []

  @Input()
  rom: Item | undefined

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rom']) {
      this.telegramLinks = changes['rom']?.currentValue?.links?.filter((link: Link) =>
        link.url.startsWith('https://t.me/') ||
        link.url.startsWith('http://t.me/') ||
        link.url.startsWith('https://telegram.me/') ||
        link.url.startsWith('http://telegram.me/')
      ) || []
      this.otherLinks = changes['rom']?.currentValue?.links?.filter((link: Link) =>
        !this.telegramLinks.some(telegramLink => telegramLink === link)
      ) || []
    }
  }
}

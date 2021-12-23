import { Component, Input } from '@angular/core';
import { Link, Maintainer } from 'src/app/schema';

@Component({
  selector: 'app-rom',
  templateUrl: './rom.component.html',
  styleUrls: ['./rom.component.scss']
})
export class RomComponent {

  @Input()
  name: string = ''

  @Input()
  androidVersions: string[] = []

  @Input()
  maintainer: undefined | Maintainer[] = []

  @Input()
  links: Link[] = []

}

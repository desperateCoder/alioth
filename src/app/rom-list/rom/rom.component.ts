import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rom',
  templateUrl: './rom.component.html',
  styleUrls: ['./rom.component.scss']
})
export class RomComponent implements OnInit {

  @Input()
  name: string = ''

  @Input()
  androidVersions: string[] = []

  @Input()
  maintainer: any[] = []

  @Input()
  links: string[] = []


  constructor() { }

  ngOnInit(): void {
  }

}

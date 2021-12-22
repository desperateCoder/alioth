import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rom-category',
  templateUrl: './rom-category.component.html',
  styleUrls: ['./rom-category.component.scss']
})
export class RomCategoryComponent implements OnInit {

  @Input()
  title: string = ''

  @Input()
  roms: any[] = []

  constructor() { }

  ngOnInit(): void {
  }

}

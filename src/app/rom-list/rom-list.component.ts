import { Component, OnInit } from '@angular/core';
import { RomService } from './rom.service';

@Component({
  selector: 'app-rom-list',
  templateUrl: './rom-list.component.html',
  styleUrls: ['./rom-list.component.scss']
})
export class RomListComponent implements OnInit {

  constructor(
    public service: RomService
  ) { }

  ngOnInit(): void {
  }

}

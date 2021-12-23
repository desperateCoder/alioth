import { Component, OnInit } from '@angular/core';
import { LicensesService } from './licenses/licenses.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  licenses: string = '';

  constructor(
    private readonly licensesService: LicensesService
  ) { }

  ngOnInit(): void {
    this.licensesService.getLicenses().subscribe(next => this.licenses = `${next}`)
  }
}

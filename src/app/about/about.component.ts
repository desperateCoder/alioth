import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LicensesService } from './licenses/licenses.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  readonly environment = environment

  constructor(
    public readonly service: LicensesService
  ) { }
}

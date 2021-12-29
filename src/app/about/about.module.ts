import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MarkdownModule } from 'ngx-markdown';



@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    MarkdownModule.forRoot(),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild([
        {
          path: '',
          component: AboutComponent
        }
      ])
  ]
})
export class AboutModule { }

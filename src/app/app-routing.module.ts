import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () => (await import('./rom-list/rom-list.module')).RomListModule
  },
  {
    path: 'about',
    loadChildren: async () => (await import('./about/about.module')).AboutModule
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

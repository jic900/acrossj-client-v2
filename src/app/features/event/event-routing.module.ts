/**
 * Created by LAE84266 on 11/08/2017.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const eventRoutes: Routes = [
]

@NgModule({
  imports: [
    RouterModule.forChild(eventRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class EventRoutingModule { }

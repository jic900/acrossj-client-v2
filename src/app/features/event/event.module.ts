/**
 * Created by LAE84266 on 11/08/2017.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EventRoutingModule } from 'app/features/event/event-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { EventSummaryComponent } from './eventsummary.component';
import { EventListComponent } from './eventlist/eventlist.component';
import { EventDetailComponent } from './eventdetail/eventdetail.component';
import { EventComponent } from './event/event.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EventRoutingModule,
    SharedModule
  ],
  declarations: [
    EventSummaryComponent,
    EventListComponent,
    EventComponent,
    EventDetailComponent
  ],
  exports: [
    EventSummaryComponent
  ]
})

export class EventModule {
}

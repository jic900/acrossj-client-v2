import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from 'app/features/user/user-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { EventModule } from 'app/features/event/event.module';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileMenuComponent } from './profile/profilemenu/profilemenu.component';
import { PersonalInfoComponent } from './profile/personalinfo/personalinfo.component';
import { ChangePasswordComponent } from './profile/changepassword/changepassword.component';
import { MessageSummaryComponent } from './message/messagesummary.component';
import { MessageDetailComponent } from './message/messagedetail/messagedetail.component';
import { UploadSummaryComponent } from './upload/uploadsummary.component';
import { UploadDetailComponent } from './upload/uploaddetail/uploaddetail.component';
import { ProfileDetailComponent } from './profile/profiledetail/profiledetail.component';
import { EventRelatedComponent } from './profile/eventrelated/eventrelated.component';
import { TransportationInfoComponent } from './profile/transportationinfo/transportationinfo.component';
import { GroupInfoComponent } from './profile/groupinfo/groupinfo.component';
import { GeneralInfoComponent } from './profile/eventrelated/generalinfo/generalinfo.component';
import { SkiInfoComponent } from './profile/eventrelated/skiinfo/skiinfo.component';
import { RunningInfoComponent } from './profile/eventrelated/runninginfo/runninginfo.component';
import { HikingInfoComponent } from './profile/eventrelated/hikinginfo/hikinginfo.component';
import { CampingInfoComponent } from './profile/eventrelated/campinginfo/campinginfo.component';
import { BicyclingInfoComponent } from './profile/eventrelated/bicyclinginfo/bicyclinginfo.component';
import { OthersInfoComponent } from './profile/eventrelated/othersinfo/othersinfo.component';
import { EventRelatedMenuComponent } from './profile/eventrelated/eventrelatedmenu/eventrelatedmenu.component';
import { ProfileMenuDummyComponent } from './profile/profilemenu/profilemenudummy.component';
import { EventRelatedMenuDummyComponent } from './profile/eventrelated/eventrelatedmenu/eventrelatedmenudummy.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
    EventModule
  ],
  declarations: [
    UserComponent,
    DashboardComponent,
    ProfileComponent,
    ProfileMenuComponent,
    ProfileDetailComponent,
    PersonalInfoComponent,
    ChangePasswordComponent,
    MessageSummaryComponent,
    MessageDetailComponent,
    UploadSummaryComponent,
    UploadDetailComponent,
    EventRelatedComponent,
    TransportationInfoComponent,
    GroupInfoComponent,
    GeneralInfoComponent,
    SkiInfoComponent,
    RunningInfoComponent,
    HikingInfoComponent,
    CampingInfoComponent,
    BicyclingInfoComponent,
    OthersInfoComponent,
    EventRelatedMenuComponent,
    ProfileMenuDummyComponent,
    EventRelatedMenuDummyComponent
  ],
  providers: []
})

export class UserModule { }

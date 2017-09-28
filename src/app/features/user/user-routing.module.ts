import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from 'app/can-deactivate-guard.service';
import { AuthGuard } from '../auth/services/authguard.service';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonalInfoComponent } from './profile/personalinfo/personalinfo.component';
import { ChangePasswordComponent } from './profile/changepassword/changepassword.component';
import { EventRelatedComponent } from './profile/eventrelated/eventrelated.component';
import { EventRelatedMenuDummyComponent } from './profile/eventrelated/eventrelatedmenu/eventrelatedmenudummy.component';
import { GeneralInfoComponent } from './profile/eventrelated/generalinfo/generalinfo.component';
import { SkiiInfoComponent } from './profile/eventrelated/skiiinfo/skiiinfo.component';
import { RunningInfoComponent } from './profile/eventrelated/runninginfo/runninginfo.component';
import { HikingInfoComponent } from './profile/eventrelated/hikinginfo/hikinginfo.component';
import { CampingInfoComponent } from './profile/eventrelated/campinginfo/campinginfo.component';
import { BicyclingInfoComponent } from './profile/eventrelated/bicyclinginfo/bicyclinginfo.component';
import { OthersInfoComponent } from './profile/eventrelated/othersinfo/othersinfo.component';
import { GroupInfoComponent } from './profile/groupinfo/groupinfo.component';
import { EventSummaryComponent } from '../event/eventsummary.component';
import { MessageSummaryComponent } from './message/messagesummary.component';
import { UploadSummaryComponent } from './upload/uploadsummary.component';
import { ProfileMenuDummyComponent } from './profile/profilemenu/profilemenudummy.component';

const userRoutes: Routes = [
  {path: '', component: UserComponent,
    children: [
      {path: '', redirectTo: '/user/dashboard', pathMatch: 'full'},
      // {path: '', component: UserComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], children: [
      // {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], children: [
        {path: '', redirectTo: '/user/profile/menu', pathMatch: 'full'},
        {path: 'menu', component: ProfileMenuDummyComponent},
        {path: 'personalinfo', component: PersonalInfoComponent, canDeactivate: [CanDeactivateGuard]},
        {path: 'personalinfo/:flag', component: PersonalInfoComponent, canDeactivate: [CanDeactivateGuard]},
        {path: 'changepassword', component: ChangePasswordComponent},
        {path: 'eventrelated', component: EventRelatedComponent, children: [
          {path: '', redirectTo: '/user/profile/eventrelated/menu', pathMatch: 'full'},
          {path: 'menu', component: EventRelatedMenuDummyComponent},
          {path: 'general', component: GeneralInfoComponent},
          {path: 'running', component: RunningInfoComponent},
          {path: 'skii', component: SkiiInfoComponent},
          {path: 'hiking', component: HikingInfoComponent},
          {path: 'camping', component: CampingInfoComponent},
          {path: 'bicycling', component: BicyclingInfoComponent},
          {path: 'others', component: OthersInfoComponent}
        ]},
        {path: 'groupinfo', component: GroupInfoComponent}
      ]},
      {path: 'events', component: EventSummaryComponent},
      {path: 'messages', component: MessageSummaryComponent},
      {path: 'uploads', component: UploadSummaryComponent}
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class UserRoutingModule { }
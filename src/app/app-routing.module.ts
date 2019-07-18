import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home-component/home.component';
import { CourseComponent } from './course/course/course.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import {ResourcesComponent} from './course/course/resources/resources.component';
import {CourseDashboardComponent} from './course/course/course-dashboard/course-dashboard.component';
import { CourseAnnouncementsComponent } from './course/course-announcements/course-announcements.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {AuthGuardAuthenticatedService} from './auth/auth-guard-authenticated.service';

const routes: Routes = [
  {path: '', canActivate: [AuthGuardService], children: [
      {path: '', component: HomeComponent},
      {path: 'courses', component: CourseListComponent, children: [
        ]},
      {path: 'course/:id', component: CourseComponent, children: [
          {path: '', component: CourseDashboardComponent},
          {path: 'resources', component: ResourcesComponent},
          {path: 'announcements', component: CourseAnnouncementsComponent}
        ]}
    ]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuardAuthenticatedService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

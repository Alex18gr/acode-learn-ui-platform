import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home-component/home.component';
import { CourseComponent } from './course/course/course.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import {ResourcesComponent} from "./course/course/resources/resources.component";
import {CourseDashboardComponent} from "./course/course/course-dashboard/course-dashboard.component";
import { CourseAnnouncementsComponent } from './course/course-announcements/course-announcements.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'courses', component: CourseListComponent, children: [
  ]},
  {path: 'course/:id', component: CourseComponent, children: [
      {path: '', component: CourseDashboardComponent},
      {path: 'resources', component: ResourcesComponent},
      {path: 'announcements', component: CourseAnnouncementsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

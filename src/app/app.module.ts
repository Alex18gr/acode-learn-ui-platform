import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home-component/home.component';
import { HomeNavbarComponent } from './home/home-navbar-component/home-navbar.component';
import { CourseComponent } from './course/course/course.component';
import { CourseNavbarComponent } from './course/course-navbar/course-navbar.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseListItemComponent } from './course/course-list/course-list-item/course-list-item.component';
import {CoursesService} from './course/courses.service';
import { ResourcesComponent } from './course/course/resources/resources.component';
import { CourseDashboardComponent } from './course/course/course-dashboard/course-dashboard.component';
import { CourseAnnouncementsComponent } from './course/course-announcements/course-announcements.component';
import { HomeAnnouncementListItemComponent } from './home/home-announcement-list/home-announcement-list-item/home-announcement-list-item.component';
import { HomeAnnouncementListComponent } from './home/home-announcement-list/home-announcement-list.component';
import { LoginComponent } from './auth/login/login.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ResourcesTableComponent } from './course/course/resources/resources-table/resources-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeNavbarComponent,
    CourseComponent,
    CourseNavbarComponent,
    CourseListComponent,
    CourseListItemComponent,
    ResourcesComponent,
    CourseDashboardComponent,
    CourseAnnouncementsComponent,
    HomeAnnouncementListItemComponent,
    HomeAnnouncementListComponent,
    LoginComponent,
    ResourcesTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CoursesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

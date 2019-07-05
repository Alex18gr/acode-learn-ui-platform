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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeNavbarComponent,
    CourseComponent,
    CourseNavbarComponent,
    CourseListComponent,
    CourseListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

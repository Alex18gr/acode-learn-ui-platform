import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home-component/home.component';
import { CourseComponent } from './course/course/course.component';
import { CourseListComponent } from './course/course-list/course-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'courses', component: CourseListComponent, children: [

  ]},
  {path: 'course/:id', component: CourseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

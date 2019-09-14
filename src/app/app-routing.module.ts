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
import {AuthGuardStudentService} from './auth/auth-guard-student.service';
import {AuthGuardAuthenticatedService} from './auth/auth-guard-authenticated.service';
import {InstructorComponent} from './instructor/instructor/instructor.component';
import {AuthGuardInstructorService} from './auth/auth-guard-instructor.service';
import {StudentHomeComponent} from './student-home/student-home.component';
import {NotAuthorizedComponent} from './auth/auth-errors/not-authorized/not-authorized.component';
import {AuthGuardHomeService} from './auth/auth-guard-home.service';
import {InstructorDashboardComponent} from './instructor/instructor-dashboard/instructor-dashboard.component';
import {InstructorCourseListComponent} from './instructor/instructor-course-list/instructor-course-list.component';
import {InstructorProfileComponent} from './instructor/instructor-profile/instructor-profile.component';
import {InstructorCoursesComponent} from './instructor/instructor-courses/instructor-courses.component';
import {InstructorCourseDashboardComponent} from './instructor/instructor-courses/instructor-course-dashboard/instructor-course-dashboard.component';
import {InstructorCourseHomeComponent} from './instructor/instructor-courses/instructor-course-home/instructor-course-home.component';
import {InstructorAnnouncementsComponent} from './instructor/instructor-announcements/instructor-announcements.component';
import {InstructorCourseSectionsComponent} from './instructor/instructor-courses/instructor-course-sections/instructor-course-sections.component';
import {InstructorCourseResourcesComponent} from './instructor/instructor-courses/instructor-course-resources/instructor-course-resources.component';
import {InstructorCourseSettingsComponent} from './instructor/instructor-courses/instructor-course-settings/instructor-course-settings.component';
import {EditorCodeComponent} from './instructor/editor-code/editor-code.component';
import {EditorMarkdownComponent} from './instructor/editor-markdown/editor-markdown.component';
import {EditorGuideComponent} from './instructor/editor-guide/editor-guide.component';
import {CourseSectionsComponent} from './course/course-sections/course-sections.component';
import {StudentProfileComponent} from './student/student-profile/student-profile.component';
import {ResourceViewerComponent} from './course/course/resources/resource-viewer/resource-viewer.component';
import {CourseSectionPageComponent} from './course/course-sections/course-section-page/course-section-page.component';

const routes: Routes = [
  {path: '', component: AppComponent, canActivate: [AuthGuardHomeService]},
  {path: 'student', component: StudentHomeComponent, canActivate: [AuthGuardStudentService], children: [
      {path: '', component: HomeComponent},
      {path: 'profile', component: StudentProfileComponent},
      {path: 'courses', component: CourseListComponent, children: [
        ]},
      {path: 'course/:cid', component: CourseComponent, children: [
          {path: '', component: CourseDashboardComponent},
          {path: 'resources', component: ResourcesComponent},
          {path: 'resources/:rid', component: ResourceViewerComponent},
          {path: 'announcements', component: CourseAnnouncementsComponent},
          {path: 'sections', component: CourseSectionsComponent},
          {path: 'sections/:secid', component: CourseSectionPageComponent}
        ]}
    ]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuardAuthenticatedService]},
  {path: 'instructor', component: InstructorComponent, canActivate: [AuthGuardInstructorService], children: [
      {path: '', component: InstructorDashboardComponent},
      {path: 'courses', component: InstructorCoursesComponent, children: [
          {path: '', component: InstructorCourseListComponent},
          {path: ':id', component: InstructorCourseDashboardComponent, children: [
              {path: '', component: InstructorCourseHomeComponent},
              {path: 'announcements', component: InstructorAnnouncementsComponent},
              {path: 'sections', component: InstructorCourseSectionsComponent},
              {path: 'resources', component: InstructorCourseResourcesComponent},
              {path: 'settings', component: InstructorCourseSettingsComponent}
            ]}
        ]},
      {path: 'editor', children: [
          {path: 'code', component: EditorCodeComponent},
          {path: 'markdown', component: EditorMarkdownComponent},
          {path: 'guide', component: EditorGuideComponent}
        ]},
      {path: 'profile', component: InstructorProfileComponent}
    ]},
  {path: 'not-authorized', component: NotAuthorizedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

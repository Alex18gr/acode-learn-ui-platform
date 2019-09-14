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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ResourcesTableComponent } from './course/course/resources/resources-table/resources-table.component';
import { InstructorComponent } from './instructor/instructor/instructor.component';
import { InstructorNavbarComponent } from './instructor/instructor-navbar/instructor-navbar.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { NotAuthorizedComponent } from './auth/auth-errors/not-authorized/not-authorized.component';
import { InstructorDashboardComponent } from './instructor/instructor-dashboard/instructor-dashboard.component';
import { InstructorCourseListComponent } from './instructor/instructor-course-list/instructor-course-list.component';
import { InstructorCourseListItemComponent } from './instructor/instructor-course-list/instructor-course-list-item/instructor-course-list-item.component';
import { InstructorProfileComponent } from './instructor/instructor-profile/instructor-profile.component';
import { InstructorAnnouncementsComponent } from './instructor/instructor-announcements/instructor-announcements.component';
import { InstructorCoursesComponent } from './instructor/instructor-courses/instructor-courses.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InstructorCourseDashboardComponent } from './instructor/instructor-courses/instructor-course-dashboard/instructor-course-dashboard.component';
import { InstructorCourseHomeComponent } from './instructor/instructor-courses/instructor-course-home/instructor-course-home.component';
import { InstructorCourseAnnouncementsComponent } from './instructor/instructor-courses/instructor-course-announcements/instructor-course-announcements.component';
import { InstructorCourseSectionsComponent } from './instructor/instructor-courses/instructor-course-sections/instructor-course-sections.component';
import { InstructorCourseResourcesComponent } from './instructor/instructor-courses/instructor-course-resources/instructor-course-resources.component';
import { InstructorCourseSettingsComponent } from './instructor/instructor-courses/instructor-course-settings/instructor-course-settings.component';
import {MaterialModule} from './material/material.module';
import { TooltipDirective } from './shared/tooltip.directive';
import { EditResourceComponent } from './instructor/edit-resource/edit-resource.component';
import { ResourceTableComponent } from './instructor/resource-table/resource-table.component';
import { ResourceEditFormComponent } from './instructor/edit-resource/resource-edit-form/resource-edit-form.component';
import { ToastContainerComponent } from './core/toast/toast-container/toast-container.component';
import { ToastComponent } from './core/toast/toast/toast.component';
import { EditorGuideComponent } from './instructor/editor-guide/editor-guide.component';
import { EditorMarkdownComponent } from './instructor/editor-markdown/editor-markdown.component';
import { EditorCodeComponent } from './instructor/editor-code/editor-code.component';
import { DeleteResourceComponent } from './instructor/delete-resource/delete-resource.component';
import { DynamicGuideComponent } from './core/dynamic-guide/dynamic-guide.component';
import { DynamicGuideElementComponent } from './core/dynamic-guide/dynamic-guide-element/dynamic-guide-element.component';
import { DynamicGuideEditResourcesModalComponent } from './core/dynamic-guide/dynamic-guide-edit-resources-modal/dynamic-guide-edit-resources-modal.component';
import { MarkdownViewerEditorComponent } from './core/dynamic-guide/dynamic-guide-element/markdown-viewer-editor/markdown-viewer-editor.component';
import { PdfViewerComponent } from './core/dynamic-guide/dynamic-guide-element/pdf-viewer/pdf-viewer.component';
import { RepositoryViewerComponent } from './core/dynamic-guide/dynamic-guide-element/repository-viewer/repository-viewer.component';
import { CodeViewerEditorComponent } from './core/dynamic-guide/dynamic-guide-element/code-viewer-editor/code-viewer-editor.component';
import { FileViewComponent } from './core/dynamic-guide/dynamic-guide-element/file-view/file-view.component';
import { ModalNewSectionComponent } from './instructor/instructor-courses/instructor-course-sections/modal-new-section/modal-new-section.component';
import { ModalDeleteSectionComponent } from './instructor/instructor-courses/instructor-course-sections/modal-delete-section/modal-delete-section.component';
import { ModalAddResourceComponent } from './instructor/instructor-courses/instructor-course-sections/modal-add-resource/modal-add-resource.component';
import { ModalDeleteResourceComponent } from './instructor/instructor-courses/instructor-course-sections/modal-delete-resource/modal-delete-resource.component';
import { EditSectionComponent } from './instructor/instructor-courses/instructor-course-sections/edit-section/edit-section.component';
import { CourseSectionResourcesTableComponent } from './instructor/instructor-courses/instructor-course-sections/course-section-resources-table/course-section-resources-table.component';
import { ModalEditCourseDetailsComponent } from './instructor/instructor-courses/instructor-course-settings/modal-edit-course-details/modal-edit-course-details.component';
import { TableStudentsComponent } from './instructor/instructor-courses/instructor-course-settings/table-students/table-students.component';
import { CourseSectionsComponent } from './course/course-sections/course-sections.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { ResourceViewerComponent } from './course/course/resources/resource-viewer/resource-viewer.component';
import { ViewerCodeComponent } from './course/course/resources/resource-viewer/viewer-code/viewer-code.component';
import { ViewerMarkdownComponent } from './course/course/resources/resource-viewer/viewer-markdown/viewer-markdown.component';
import { ViewerGuideComponent } from './course/course/resources/resource-viewer/viewer-guide/viewer-guide.component';
import { CourseSectionPageComponent } from './course/course-sections/course-section-page/course-section-page.component';

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
    ResourcesTableComponent,
    InstructorComponent,
    InstructorNavbarComponent,
    StudentHomeComponent,
    NotAuthorizedComponent,
    InstructorDashboardComponent,
    InstructorCourseListComponent,
    InstructorCourseListItemComponent,
    InstructorProfileComponent,
    InstructorAnnouncementsComponent,
    InstructorCoursesComponent,
    InstructorCourseDashboardComponent,
    InstructorCourseHomeComponent,
    InstructorCourseAnnouncementsComponent,
    InstructorCourseSectionsComponent,
    InstructorCourseResourcesComponent,
    InstructorCourseSettingsComponent,
    TooltipDirective,
    EditResourceComponent,
    ResourceTableComponent,
    ResourceEditFormComponent,
    ToastContainerComponent,
    ToastComponent,
    EditorGuideComponent,
    EditorMarkdownComponent,
    EditorCodeComponent,
    DeleteResourceComponent,
    DynamicGuideComponent,
    DynamicGuideElementComponent,
    DynamicGuideEditResourcesModalComponent,
    MarkdownViewerEditorComponent,
    PdfViewerComponent,
    RepositoryViewerComponent,
    CodeViewerEditorComponent,
    FileViewComponent,
    ModalNewSectionComponent,
    ModalDeleteSectionComponent,
    ModalAddResourceComponent,
    ModalDeleteResourceComponent,
    EditSectionComponent,
    CourseSectionResourcesTableComponent,
    ModalEditCourseDetailsComponent,
    TableStudentsComponent,
    CourseSectionsComponent,
    StudentProfileComponent,
    ResourceViewerComponent,
    ViewerCodeComponent,
    ViewerMarkdownComponent,
    ViewerGuideComponent,
    CourseSectionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    CoursesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

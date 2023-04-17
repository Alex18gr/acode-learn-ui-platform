import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../core/toast/toast.service';
import { NotificationTypes, ToastActions } from '../../core/toast/toast.model';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css'],
})
export class InstructorDashboardComponent implements OnInit {
  constructor(private toastService: ToastService) {}

  ngOnInit() {}

  addToast(num: number) {
    switch (num) {
      case 1:
        this.toastService.addToast({
          action: ToastActions.none,
          notificationType: NotificationTypes.none,
          title: 'Resource Added !!!',
          message: 'Resource added to course !!!',
          delay: 5000,
        });
        break;
      case 2:
        this.toastService.addToast({
          action: ToastActions.none,
          notificationType: NotificationTypes.none,
          title: 'File Upload',
          message: 'File uploading... 74% completed',
          delay: 5000,
        });
    }
  }
}

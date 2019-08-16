import {Injectable} from '@angular/core';
import {NotificationTypes, Toast, ToastActions} from './toast.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: Toast[] = [
    {
      action: ToastActions.none,
      notificationType: NotificationTypes.none,
      title: 'This is a toast',
      message: 'This is a toast message',
      delay: 5000
    },
    {
      action: ToastActions.none,
      notificationType: NotificationTypes.none,
      title: 'This is a toast 2',
      message: 'This is a toast message 2',
      delay: 5000
    },
    {
      action: ToastActions.none,
      notificationType: NotificationTypes.none,
      title: 'This is a toast 3',
      message: 'This is a toast message 3',
      delay: 5000
    },
    {
      action: ToastActions.none,
      notificationType: NotificationTypes.none,
      title: 'This is a toast 4',
      message: 'This is a toast message 4',
      delay: 5000
    }
  ];
  toastsUpdated: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.toastsUpdated.next(true);
  }

  addToast(toast: Toast) {
    this.toasts.push(toast);
  }

  addErrorToast(title: string, message: string, delay?: number) {
    this.toasts.push({
      action: ToastActions.failed,
      notificationType: NotificationTypes.danger,
      title,
      message,
      delay: delay ? delay : 5000
    });
  }

  addSaveToast(title: string, message: string, delay?: number) {
    this.toasts.push({
      action: ToastActions.updated,
      notificationType: NotificationTypes.info,
      title,
      message,
      delay: delay ? delay : 5000
    });
  }

  addDeleteToast(title: string, message: string, delay?: number) {
    this.toasts.push({
      action: ToastActions.deleted,
      notificationType: NotificationTypes.info,
      title,
      message,
      delay: delay ? delay : 5000
    });
  }
}

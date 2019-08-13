export class Toast {
  action: ToastActions;
  notificationType: NotificationTypes;
  title: string;
  message: string;
  delay: number;
}

export enum NotificationTypes {
  none,
  info,
  warning,
  danger
}

export enum ToastActions {
  none,
  upload,
  created,
  updated,
  deleted,
  failed,
  new,
  important
}

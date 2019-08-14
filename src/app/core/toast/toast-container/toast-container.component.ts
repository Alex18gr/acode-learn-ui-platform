import { Component, OnInit } from '@angular/core';
import {Toast} from '../toast.model';
import {ToastService} from '../toast.service';
import {Subscription} from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.css']
})
export class ToastContainerComponent implements OnInit {

  toasts: Toast[] = [];
  toastsUpdatedSubscription: Subscription;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastsUpdatedSubscription = this.toastService.toastsUpdated.subscribe((d) => {
      this.toasts = this.toastService.toasts;
    });
    this.toasts = this.toastService.toasts;
  }

  toastDisposed(index: number) {
    this.toasts.splice(index, 1);
  }

  isToastListEmpty() {
    return !(this.toasts.length > 0);
  }
}

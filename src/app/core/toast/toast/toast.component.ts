import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Toast} from '../toast.model';

declare var $: any;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, AfterViewInit {
  @ViewChild('toast', {static: false}) toast: ElementRef;
  @Input() toastData: Toast;
  @Input() toastIndex: number;
  @Output() toastDisposed: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.initToast();
  }

  private initToast() {
    // attach the options to the toast element
    $(this.toast.nativeElement).toast({
      delay: this.toastData.delay,
      // autohide: false
    });

    // show the toast element to the dom
    $(this.toast.nativeElement).toast('show');

    // the event when the toast is hidden
    $(this.toast.nativeElement).on('hidden.bs.toast', () => {
      this.toastDisposed.emit(this.toastIndex);
    });
  }
}

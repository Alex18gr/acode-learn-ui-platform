import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ResourceGuide} from '../models/resource-models/resource-guide.model';
import {DynamicGuideService, GuideData} from './dynamic-guide.service';
import {DynamicGuideEditResourcesModalComponent} from './dynamic-guide-edit-resources-modal/dynamic-guide-edit-resources-modal.component';
import {ToastService} from '../toast/toast.service';

@Component({
  selector: 'app-dynamic-guide',
  templateUrl: './dynamic-guide.component.html',
  styleUrls: ['./dynamic-guide.component.css']
})
export class DynamicGuideComponent implements OnInit, OnChanges {
  @Input() guideResource: ResourceGuide;
  @Input() editMode = false;
  @Input() courseId;
  @ViewChild('editModal', {static: false}) editModal: DynamicGuideEditResourcesModalComponent;
  guideData: GuideData;

  constructor(private dynamicGuideService: DynamicGuideService,
              private toastService: ToastService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.guideResource &&
        changes.guideResource.currentValue !== changes.guideResource.previousValue) {
        this.initGuide();
      }
    }
  }

  private initGuide() {
    this.dynamicGuideService.getGuideDataFromResource(this.guideResource)
      .subscribe((data: GuideData) => {
        this.guideData = data;
        console.log(data);
      });
  }

  onSaveGuide(value: GuideData) {
    this.guideData = value;
    console.log(value);
    this.dynamicGuideService.saveGuideResource(value, this.courseId)
      .subscribe((data: any) => {
        this.toastService.addSaveToast('Resource Saved',
          'Rsource "' + data.name + '" saved successfully.');
      });
  }

  onEditResources() {
    this.editModal.openModal(this.guideData);
  }
}

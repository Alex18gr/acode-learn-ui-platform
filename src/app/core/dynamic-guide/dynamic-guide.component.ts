import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ResourceGuide} from '../models/resource-models/resource-guide.model';
import {DynamicGuideService, GuideData} from './dynamic-guide.service';

@Component({
  selector: 'app-dynamic-guide',
  templateUrl: './dynamic-guide.component.html',
  styleUrls: ['./dynamic-guide.component.css']
})
export class DynamicGuideComponent implements OnInit, OnChanges {
  @Input() guideResource: ResourceGuide;
  guideData: GuideData;

  constructor(private dynamicGuideService: DynamicGuideService) { }

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
}

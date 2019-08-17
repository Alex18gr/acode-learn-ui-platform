import {Component, Input, OnInit} from '@angular/core';
import {GuideDataResource} from '../dynamic-guide.service';
import {ResourceTypes} from '../../models/resource-models/resource-types';

@Component({
  selector: 'app-dynamic-guide-element',
  templateUrl: './dynamic-guide-element.component.html',
  styleUrls: ['./dynamic-guide-element.component.css']
})
export class DynamicGuideElementComponent implements OnInit {
  @Input() resource: GuideDataResource;
  @Input() editMode: boolean;
  private resourceTypes = ResourceTypes;

  constructor() { }

  ngOnInit() {
  }

}

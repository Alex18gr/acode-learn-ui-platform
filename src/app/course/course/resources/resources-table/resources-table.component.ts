import {Component, Input, OnInit} from '@angular/core';
import {Resource} from '../../../resource/resource-models/resource.model';

@Component({
  selector: 'app-resources-table',
  templateUrl: './resources-table.component.html',
  styleUrls: ['./resources-table.component.css']
})
export class ResourcesTableComponent implements OnInit {
  @Input() resourcesList: Resource[];
  @Input() resourceType: string;

  constructor() { }

  ngOnInit() {
  }

}

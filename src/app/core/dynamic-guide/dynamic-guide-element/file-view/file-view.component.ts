import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ResourceCodeSnippet} from '../../../models/resource-models/resource-code-snippet.model';
import {ResourceFile} from '../../../models/resource-models/resource-file.model';
import {GeneralService} from '../../../general.service';
import {InstructorResourceService} from '../../../../instructor/resource/instructor-resource.service';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css']
})
export class FileViewComponent implements OnInit, OnChanges {
  @Input() resource: ResourceFile;
  @Input() editMode: boolean;
  @Input() courseId;
  fileTypeClass: string[];

  constructor(private generalService: GeneralService,
              private instructorResourceService: InstructorResourceService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resource && (changes.resource.currentValue !== changes.resource.previousValue)) {
      this.fileTypeClass = this.generalService.getFileTypeClass(this.resource.fileType);
    }
  }

  downloadFile() {
    this.instructorResourceService.downloadFile(this.resource, this.courseId);
  }

}

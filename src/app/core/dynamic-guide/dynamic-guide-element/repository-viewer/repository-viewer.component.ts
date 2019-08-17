import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ResourceMarkdown} from '../../../models/resource-models/resource-markdown.model';
import {ResourceRepository} from '../../../models/resource-models/resource-repository.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-repository-viewer',
  templateUrl: './repository-viewer.component.html',
  styleUrls: ['./repository-viewer.component.css']
})
export class RepositoryViewerComponent implements OnInit, OnChanges {
  @Input() resource: ResourceRepository;
  @Input() editMode: boolean;
  @Input() courseId;
  private data: any;
  private isLoaded = false;
  private repoUrl = 'https://api.github.com/';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    if (this.resource) {
      this.getRepositoryDetails(this.resource.repoNameRepo);
    }
  }

  private getDateFromString(date: string) {
    return new Date(date);
  }

  private kFormatter(num) {
    // @ts-ignore
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num);
  }

  navigateToRepository() {
    if (this.isLoaded) {
      // window.location.href = this.data.data.html_url;
      window.open(this.data.html_url, '_blank');
    }
  }

  private getRepositoryDetails(repoOwnerName: string) {

    this.httpClient.get(this.repoUrl + 'repos/' + repoOwnerName.split('/')[0] +
      '/' + repoOwnerName.split('/')[1] + '')
      .subscribe(data => {
        console.log(data);
        this.data = data;
        this.isLoaded = true;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resource &&
      changes.resource.previousValue !== changes.resource.currentValue) {
      this.isLoaded = false;
      this.getRepositoryDetails(this.resource.repoNameRepo);
    }
  }

}

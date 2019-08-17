import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  getFileTypeClass(fileType: string) {
    switch (fileType) {
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return ['fas fa-file-word'];
      case 'application/pdf':
        return ['fas fa-file-pdf'];
      case 'image/jpeg':
      case 'image/gif':
      case 'image/vnd.microsoft.icon':
        return ['fas fa-file-image'];
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return ['fas fa=file-excel'];
      case 'application/vnd.ms-powerpoint':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return ['fas fa-file-powerpoint'];
      case 'application/x-rar-compressed':
      case 'application/zip':
      case 'application/x-zip-compressed':
      case 'application/x-7z-compressed':
        return ['fas fa-file-archive'];
      default:
        return ['fas fa-file'];
    }
  }
}

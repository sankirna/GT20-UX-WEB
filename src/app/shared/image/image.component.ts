import { Component, Input } from '@angular/core';
import { FileUploadRequestModel } from 'src/app/models/file.model';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  @Input() file: FileUploadRequestModel| undefined;
}

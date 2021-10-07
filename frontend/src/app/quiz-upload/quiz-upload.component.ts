import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-quiz-upload',
  templateUrl: './quiz-upload.component.html',
  styleUrls: ['./quiz-upload.component.css']
})
export class QuizUploadComponent implements OnInit {

  // name: string ="";
  // passcode: string ="";
  // repasscode: string="";
  file?: File;

  quizID?: string;

  fileUpload = new FormGroup({
    name: new FormControl("", Validators.required),
    passcode: new FormControl("", Validators.required),
    repasscode: new FormControl("", Validators.required)
  });

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  onFileUpload(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onCreateQuiz() {
    const fileData = new FormData();

    if (this.fileUpload.valid && !!this.file) {
      fileData.append("title", this.fileUpload.get("name")?.value);
      fileData.append("passcode", this.fileUpload.get("passcode")?.value);
      fileData.append("file", this.file);
      this.apiService.createQuiz(fileData).subscribe(
        data => {
          console.log(data);
          // @ts-ignore
          this.quizID = data._id;
        }, error => {
          console.log(error);
        }
      );
    }

    
  }

}

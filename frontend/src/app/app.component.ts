import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Sample Quiz';

  constructor(public appService: AppService, private apiService: ApiService) {
    apiService.checkAuth().subscribe(
      data => {
        this.appService.setUser({id:data.id, email: data.email});
        console.log(data);
      }, error => {
        localStorage.removeItem("user");
        console.log(error);
      }
    );
  }
}

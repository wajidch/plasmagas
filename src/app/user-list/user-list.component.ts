import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../shared/main-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  getUserRes: any;

  constructor(private service: MainServiceService) { }

  ngOnInit() {
    this.getUserFunc();
  }

  getUserFunc(): void {
    this.service.getUsers().subscribe((res:any) => {
      this.getUserRes = res.response;
     
      if (this.getUserRes.statusCode == 200) {

      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails: any;

  constructor(
    private token: TokenStorageService, 
    private userService: UserService,
  ) { }
  
  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    this.userService.getDetails().subscribe(data => {
      console.log(data)
      this.userDetails = data;
    });
  }
}

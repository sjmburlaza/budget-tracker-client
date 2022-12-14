import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;
  quoteText: string = '';

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    ) { }

  ngOnInit(): void {
    const element = document.body;
    if (!this.isLoggedIn) {
      element.style.backgroundColor = '#c7e3f9';
    }
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      element.style.backgroundColor = 'transparent';
    }
    this.getQuote();
  }

  getQuote(): void {
    this.userService.getQuote().subscribe(data => {
      const list = data;
      const listLength = list.length;
      let randomNum = Math.floor(Math.random() * listLength);
      this.quoteText = list[randomNum]['text'];
    })
  }

}

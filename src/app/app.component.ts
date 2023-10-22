import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Path } from './shared/models/path.model';
import { User } from './shared/models/user.model';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = this.authService.isLoggedIn();
  mainContentWidth = 100;
  paths: Path[] = [];
  user: User | undefined;


  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.mainContentWidth = 80;
    }

    this.paths = [
      {
        name: 'Dashboard',
        path: 'dashboard',
        icon: 'bi bi-clipboard2-pulse-fill'
      },
      {
        name: 'Transaction Records',
        path: 'records',
        icon: 'bi bi-card-list'
      },
      {
        name: 'Charts',
        path: 'charts',
        icon: 'bi bi-pie-chart-fill'
      },
      {
        name: 'Categories',
        path: 'categories',
        icon: 'bi bi-tag-fill'
      },
      {
        name: 'Account',
        path: 'account',
        icon: 'bi bi-person-circle'
      },
    ]

    this.userService.getUser();
    this.userService.user$.subscribe(res => {
      this.user = res;
    })
  }
}

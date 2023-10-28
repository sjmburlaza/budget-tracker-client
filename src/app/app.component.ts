import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Path } from './shared/models/path.model';
import { User } from './shared/models/user.model';
import { UserService } from './services/user.service';
import { TokenStorageService } from './services/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'bt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  mainContentWidth = 100;
  topPaths: Path[] = [];
  bottomPaths: Partial<Path>[] = [];
  user: User | undefined;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    
    if (this.isLoggedIn) {
      this.mainContentWidth = 80;
    }

    this.topPaths = [
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
    ];

    this.bottomPaths = [
      {
        name: 'Sign-out',
        icon: 'bi bi-box-arrow-right'
      }
    ];

    this.userService.getUser();
    this.userService.user$.subscribe(res => {
      this.user = res;
    })
  }

  async signOut(): Promise<void> {
    this.tokenStorage.signOut();
    await this.router.navigate(['/login']);
    window.location.reload();
  }
}

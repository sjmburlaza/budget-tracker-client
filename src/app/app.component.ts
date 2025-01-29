import { Component, OnInit } from '@angular/core';
import { Path } from './shared/models/path.model';
import { User } from './shared/models/user.model';
import { Observable } from 'rxjs';
import { AuthState } from './state/reducers/auth.reducer';
import { selectToken, selectUser } from './state/selectors/auth.selectors';
import { logout } from './state/actions/login.actions';
import { Store } from '@ngrx/store';
import { BOTTOM_PATHS, TOP_PATHS } from './shared/constants/menu.const';


@Component({
  selector: 'bt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mainContentWidth = 80;
  topPaths: Path[] = [];
  bottomPaths: Partial<Path>[] = [];


  user$: Observable<User | null>;
  token$: Observable<string | null>;

  constructor(private store: Store<AuthState>) {
    this.user$ = this.store.select(selectUser);
    this.token$ = this.store.select(selectToken);
  }

  ngOnInit(): void {
    this.topPaths = TOP_PATHS;
    this.bottomPaths = BOTTOM_PATHS;
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}

import { Component, Input } from '@angular/core';
import { Path } from '../../models/path.model';
import { User } from '../../models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bt-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  @Input() user: User | undefined;
  @Input() paths: Path[] = [];

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
  ) {}

  ngOnInit(): void {

  }

  async signOut(): Promise<void> {
    this.tokenStorage.signOut();
    await this.router.navigate(['/login']);
    window.location.reload();
  }
}

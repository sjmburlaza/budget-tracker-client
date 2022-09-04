import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  firstName?: string;

  constructor(
    private modalService: NgbModal,
    private tokenStorageService: TokenStorageService,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.firstName = user.firstName;
    }
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
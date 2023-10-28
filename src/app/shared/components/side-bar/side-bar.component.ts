import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Path } from '../../models/path.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'bt-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  @Input() user: User | undefined;
  @Input() topPaths: Path[] = [];
  @Input() bottomPaths: Partial<Path>[] = [];
  @Output() signOutEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {

  }

  onSignOut() {
    this.signOutEvent.emit();
  }
}

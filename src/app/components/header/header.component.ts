import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogoutService } from '../../Services/logout.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // @Output() logoutClicked: EventEmitter<boolean> = new EventEmitter()
  @Input() typeofUser: string | null = null;
  constructor(private logoutService: LogoutService, private router: Router){}
  LogoutClick(){
    this.logoutService.emitLogout()
  }

  @Input() content: string = ''

  isUserOrAdminDashboard(): boolean {
    const currentUrl = this.router.url;
    return currentUrl === '/' || currentUrl === ('/admin');
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {
  @Input() role: string = "User"
}

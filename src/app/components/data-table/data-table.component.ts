import { Component, Input } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { User } from '../../../_model/User';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
// @Input() colItems: string[] = []

colItems : string[] = ["Name","Email","Phone","Actions"];
users : User[] = [{name:"Sreerag PA",email:"catchsreerag@gmail.com",phone:"7034756328"}]
}

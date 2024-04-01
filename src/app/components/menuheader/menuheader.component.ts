import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menuheader',
  standalone: true,
  imports: [RouterLink,MaterialModule],
  templateUrl: './menuheader.component.html',
  styleUrl: './menuheader.component.css'
})
export class MenuheaderComponent {

}

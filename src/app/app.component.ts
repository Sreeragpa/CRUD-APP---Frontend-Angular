import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { HeaderComponent } from "./components/header/header.component";
import { UserloginComponent } from "./components/user/userlogin/userlogin.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, UserloginComponent, ]
})
export class AppComponent implements OnInit {
  title = 'crud-app';
  ngOnInit(): void {
    initFlowbite()

  }
}

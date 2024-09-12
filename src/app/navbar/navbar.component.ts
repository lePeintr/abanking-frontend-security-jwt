import { Component, OnInit } from '@angular/core';
import { RouterOutlet,RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterModule,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  constructor(public authService:AuthService,private router:Router){}
  ngOnInit(): void {
  }
  handleLogout(){
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}

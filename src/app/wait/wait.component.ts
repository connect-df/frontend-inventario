import { KeycloakService } from 'keycloak-angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wait',
  templateUrl: './wait.component.html',
  styleUrls: ['./wait.component.css']
})
export class WaitComponent implements OnInit {

  constructor(private keycloakService: KeycloakService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['/home'])
  }

}

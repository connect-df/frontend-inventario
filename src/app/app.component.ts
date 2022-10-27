import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'inventario-connect';
 
  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,

  ) { }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  exibindoNavbar() {

    return (this.router.url !== '/login' && !this.router.url.includes('/redirect'))

  }
}

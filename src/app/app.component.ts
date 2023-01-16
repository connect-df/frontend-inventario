import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'inventario-connect';

  username!: string;
  isLogado: boolean = false;
  isAdm: boolean = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private oauthService: OAuthService

  ) {
    this.configure();
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  exibindoNavbar() {
    return (this.router.url !== '/login' && !this.router.url.includes('/redirect'))
  }

  authConfig: AuthConfig = {

    issuer: 'http://localhost:8081/realms/connectdf',
    redirectUri: window.location.origin,
    clientId: 'connect-inventario',
    responseType: 'code',
    scope: 'openid profile email offline_access',

    showDebugInformation: true,
  };

  configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin()).then(() => {
      if (this.oauthService.getIdentityClaims()) {
        this.isAdmin();
      }
    });
  }

  public isLogged(): boolean {
    return (this.oauthService.hasValidAccessToken() && this.oauthService.hasValidAccessToken());
  }


  public isAdmin(): boolean {
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecode = JSON.parse(payloadDecodedJson);
    // console.log(payloadDecode.realm_access)
    return payloadDecode.realm_access.roles.indexOf('realm-admin') !== -1;
  }


}

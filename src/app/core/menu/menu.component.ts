import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario = '';
  logado = false;

  exibirNav = false;
  exibirUsuario = false;
  exibirInventario = false;

  items!: MenuItem[];
  itemMenu!: MenuItem[];

  constructor(
    private router: Router,
    private keycloakService: KeycloakService
  ) { }

  ngOnInit() {
    this.getItensMenu()
    this.initializeUserOptions()
    if (this.keycloakService.getKeycloakInstance().authenticated == true) {
      this.statusLogado();
    }
    // console.log(this.keycloakService.getKeycloakInstance())
  }

  private initializeUserOptions(): void {
    const nome = this.keycloakService.getKeycloakInstance().profile?.firstName
    const sobrenome = this.keycloakService.getKeycloakInstance().profile?.lastName
    const nomeCompleto = `${nome} ${sobrenome}`;
    this.usuario = nomeCompleto
  }

  statusLogado() {
    this.logado = true
  }

  getItensMenu() {
    this.itemMenu = [
      {
        label: "Administrador",//String(localStorage!.getItem('nomeUsuario')),
        icon: 'pi pi-fw pi-user',
        command: () => this.exibirNav = false
      },
      {
        label: 'Usuarios',
        visible: this.exibirUsuario,
        items: [
          {
            label: 'Novo Usuário',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/usuarios/novo',
            command: () => this.exibirNav = false,
          },
          {
            label: 'Todos os Usuários',
            icon: 'pi pi-fw pi-users',
            routerLink: '/usuarios',
            command: () => this.exibirNav = false
          }
        ]
      },
      {
        label: 'Inventário',
        // visible: this.exibirInventario,
        items: [
          {
            label: 'Locais',
            icon: 'pi pi-fw pi-map-marker',
            routerLink: '/local',
            command: () => this.exibirNav = false
          },
          {
            label: 'Tipo de Itens',
            icon: 'pi pi-fw pi-box',
            routerLink: '/tipo',
            command: () => this.exibirNav = false
          },
          {
            label: 'Responsáveis',
            icon: 'pi pi-fw pi-users',
            routerLink: '/pessoa',
            command: () => this.exibirNav = false,
          },
          {
            label: 'Todos os itens',
            icon: 'pi pi-fw pi-list',
            routerLink: '/itens',
            command: () => this.exibirNav = false,
          },
        ]
      },
      {
        label: 'Ler Qr-Code',
        icon: 'pi pi-fw pi-qrcode',
        command: () => this.leitor(),
      },
      {
        label: 'Sair',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  logout() {
    // localStorage.removeItem('recent-used-realms')
    this.logado = false;
    this.keycloakService.logout('/wait')
  }

  leitor() {
    this.exibirNav = false
    this.router.navigate(['/leitor'])
  }

}

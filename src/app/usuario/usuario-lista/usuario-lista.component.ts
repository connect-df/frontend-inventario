import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit {

  title: string = 'usuarios'
  usuarios: Usuario[] = new Array<Usuario>()
  usuario: Usuario = new Usuario
  usuariosLazyLoad: Usuario[] = new Array<Usuario>()

  loading: boolean = false
  totaldeRegistros: number = 0

  constructor(
    private usuarioService: UsuarioService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,

  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getUsuarios()
  }

  getUsuarios() {
    this.usuarioService.listar().subscribe(
      (response) => {
        this.usuarios = [...response]
        this.usuariosLazyLoad = [...response]
        this.totaldeRegistros = response.length
      }
    )
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.usuarios) {

        let numPrimeiraLinha: number = Number(event.first)
        let numLinhasPagina: number = (numPrimeiraLinha + Number(event.rows))
        this.usuarios = [...this.usuariosLazyLoad.slice(numPrimeiraLinha, numLinhasPagina)];

        this.loading = false;
      }
    }, 1000);
  }
  lectionChange(value = []) {
    this.usuarios = [...value];
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente DELETAR esse Usuario?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Você confirmou a operação!' });
        this.usuarioService.getDelete(id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Deletado', detail: 'Usuario deletado com sucesso!' });
            setTimeout(() => {
              return window.location.reload();
            }, 1000)
          }, (erro) => {
            console.log(erro)
          }
        );


      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejeitado', detail: 'Você rejeitou a operação.' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Você cancelou a operação.' });
            break;
        }
      }
    });
  }
}

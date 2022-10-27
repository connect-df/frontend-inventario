import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  title: string = 'Cadastrar Usuario'

  usuarios: Observable<Usuario[]>;
  usuario: Usuario = new Usuario

  constructor(
    private usuarioService: UsuarioService,
   
    private messageService: MessageService,
    private confirmationService: ConfirmationService,

    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usuarios = this.usuarioService.listar()
  }

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.title = 'Alterar usuario'
      this.getUsuario(id)
    }
    // this.getLocal()
    // this.getTipo()
  }

  getUsuario(id: number) {
    this.usuarioService.getById(id).subscribe(
      (response) => {
        this.usuario = { ...response }

      }
    )
  }

  getAlterar() {

    this.usuarioService.getAlterar(this.usuario.id, this.usuario).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Alteração ', detail: 'Usuario alterado com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/usuariosssssss'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIncluir() {


    this.usuarioService.getIncluir(this.usuario).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Inclusão ', detail: 'Usuario cadastrado com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/usuarios'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIsEditando() {
    return Boolean(this.usuario.id)
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Deseja SALVAR esse usuario?',
      header: 'SALVAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Você confirmou a operação!' });
        if (this.getIsEditando()) {
          this.getAlterar()
        } else {
          this.getIncluir()
        }
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

  onDelete(id: number){
    this.confirmationService.confirm({
      message: 'Deseja realmente DELETAR esse Usuario?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Você confirmou a operação!' });
        this.usuarioService.getDelete(id).subscribe();
        return window.location.reload();
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

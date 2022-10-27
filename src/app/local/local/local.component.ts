import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Local } from '../local';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {
  title: string = 'Cadastrar Local'

  locais: Observable<Local[]>;
  local: Local = new Local

  constructor(
    private localService: LocalService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,

    private router: Router,
    private route: ActivatedRoute
  ) {
    this.locais = this.localService.listar()
  }

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.title = 'Alterar local'
      this.getLocal(id)
    }
  }

  getLocal(id: number) {
    this.localService.getById(id).subscribe(
      (response) => {
        this.local = { ...response }

      }
    )
  }

  getAlterar() {

    this.localService.getAlterar(this.local.id, this.local).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Alteração ', detail: 'Local alterado com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/local'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIncluir() {


    this.localService.getIncluir(this.local).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Inclusão ', detail: 'Local adicionado com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/local'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIsEditando() {
    return Boolean(this.local.id)
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Deseja SALVAR esse local?',
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

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente DELETAR esse projeto?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Você confirmou a operação!' });
        this.localService.getDelete(id).subscribe();
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
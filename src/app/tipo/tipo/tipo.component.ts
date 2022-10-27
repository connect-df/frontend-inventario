import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Tipo } from '../tipo';
import { TipoService } from '../tipo.service';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoComponent implements OnInit {
  title: string = 'Cadastrar Tipo de itens'
  tipos: Observable<Tipo[]>;
  tipo: Tipo = new Tipo

  constructor(

    private tipoService: TipoService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,

    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tipos = this.tipoService.listar()
  }

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.title = 'Alterar tipo de itens'
      this.getTipo(id)
    }
  }

  getTipo(id: number) {
    this.tipoService.getById(id).subscribe(
      (response) => {
        this.tipo = { ...response }

      }
    )
  }

  getAlterar() {

    this.tipoService.getAlterar(this.tipo.id, this.tipo).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Alteração ', detail: 'Tipos alterado com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/tipos'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIncluir() {


    this.tipoService.getIncluir(this.tipo).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Inclusão ', detail: 'Tipo de itens adicionado com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/tipo'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIsEditando() {
    return Boolean(this.tipo.id)
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Deseja SALVAR esse tipo de item?',
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
      message: 'Deseja realmente DELETAR esse Local?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Você confirmou a operação!' });
        this.tipoService.getDelete(id).subscribe();
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

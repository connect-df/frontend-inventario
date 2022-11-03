import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Local } from '../local';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-local-lista',
  templateUrl: './local-lista.component.html',
  styleUrls: ['./local-lista.component.css']
})
export class LocalListaComponent implements OnInit {

  title: string = 'Locais'
  locais: Local[] = new Array<Local>()
  local: Local = new Local
  locaisLazyLoad: Local[] = new Array<Local>()

  loading: boolean = false
  totaldeRegistros: number = 0

  constructor(
    private localService: LocalService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,

  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getLocais()
  }

  getLocais() {
    this.localService.listar().subscribe(
      (response) => {
        this.locais = [...response]
        this.locaisLazyLoad = [...response]
        this.totaldeRegistros = response.length
      }, erro => {
        if (erro != null) {
          this.messageService.add({ severity: 'error', summary: 'Erro desconhecido', detail: 'Estamos enfrentando um erro interno. Tente novamente mais tarde.' });
        }
      }
    )
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.locais) {

        let numPrimeiraLinha: number = Number(event.first)
        let numLinhasPagina: number = (numPrimeiraLinha + Number(event.rows))
        this.locais = [...this.locaisLazyLoad.slice(numPrimeiraLinha, numLinhasPagina)];

        this.loading = false;
      }
    }, 1000);
  }
  lectionChange(value = []) {
    this.locais = [...value];
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente DELETAR esse local?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Você confirmou a operação!' });
        this.localService.getDelete(id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Deletado', detail: 'Local deletado com sucesso!' });
            setTimeout(() => {
              return window.location.reload();
            }, 1000)
          }, (erro) => {
            if (erro.status == 500) {
              this.messageService.add({ severity: 'error', summary: 'Erro ao deletar', detail: 'Há itens registrados nesse local, Por isso não é possível excluí-lo.' });
            } else if (erro != null) {
              this.messageService.add({ severity: 'error', summary: 'Erro ao deletar', detail: 'Estamos enfrentado alguns erros de sistema. Tente novamente mais tarde.' });
            }
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

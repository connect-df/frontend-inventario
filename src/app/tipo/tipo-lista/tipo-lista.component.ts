import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Tipo } from '../tipo';
import { TipoService } from '../tipo.service';

@Component({
  selector: 'app-tipo-lista',
  templateUrl: './tipo-lista.component.html',
  styleUrls: ['./tipo-lista.component.css']
})
export class TipoListaComponent implements OnInit {
  title: string = 'Tipo de tipos'
  tipos: Tipo[] = new Array<Tipo>()
  tipo: Tipo = new Tipo
  tipoLazyLoad: Tipo[] = new Array<Tipo>()

  loading: boolean = false
  totaldeRegistros: number = 0

  constructor(
    private tipoService: TipoService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,

  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getItens()
  }

  getItens() {
    this.tipoService.listar().subscribe(
      (response) => {
        this.tipos = [...response]
        this.tipoLazyLoad = [...response]
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
      if (this.tipos) {

        let numPrimeiraLinha: number = Number(event.first)
        let numLinhasPagina: number = (numPrimeiraLinha + Number(event.rows))
        this.tipos = [...this.tipoLazyLoad.slice(numPrimeiraLinha, numLinhasPagina)];

        this.loading = false;
      }
    }, 1000);
  }
  lectionChange(value = []) {
    this.tipos = [...value];
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente DELETAR esse tipo de item?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Você confirmou a operação!' });
        this.tipoService.getDelete(id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Deletado', detail: 'Tipo de item deletado com sucesso!' });
            setTimeout(() => {
              return window.location.reload();
            }, 1000)
          }, (erro) => {
            if (erro.status == 500) {
              this.messageService.add({ severity: 'error', summary: 'Erro ao deletar', detail: 'Há itens registrados com esse tipo de item, Por isso não é possível excluí-lo.' });
            }
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

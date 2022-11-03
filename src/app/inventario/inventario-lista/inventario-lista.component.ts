import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Local } from 'src/app/local/local';
import { Inventario } from '../inventario';
import { InventarioService } from '../inventario.service';

@Component({
  selector: 'app-inventario-lista',
  templateUrl: './inventario-lista.component.html',
  styleUrls: ['./inventario-lista.component.css']
})
export class InventarioListaComponent implements OnInit {
  title: string = 'Todos os Itens'

  item = new Inventario
  itens = new Array<Inventario>()
  itensLazyLoad = new Array<Inventario>()

  loading: boolean = false
  totaldeRegistros: number = 0

  constructor(
    private inventarioService: InventarioService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,

    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    const local: Local = this.route.snapshot.params['local'];

    this.loading = true;
    if (local) {
      this.getItensLocal(local)
      console.log(local)
    } else {
      this.getItens(local)
    }
  }

  getItens(local: Local) {
    this.inventarioService.listar().subscribe(
      (response) => {
        if (response) {
          if (local != null) {
            this.title = "Itens de " + local;
          } else if (response != null) {
            this.itens = [...response];
            this.itensLazyLoad = [...response]
            this.totaldeRegistros = response.length
          }
        }
      }, erro => {
        if (erro.status == 404) {
          this.messageService.add({ severity: 'error', summary: 'Erro 404', detail: 'Página não encontrada.' });
        } else if (erro.status == 500) {
          this.messageService.add({ severity: 'error', summary: 'Erro 500', detail: 'Houve um erro ao carregar as informações.' });
        }
        else if (erro != null) {
          this.messageService.add({ severity: 'error', summary: 'Erro de sistema', detail: 'Estamos enfrentado alguns erros de sistema. Tente novamente mais tarde.' });
        }
      }
    )
  }


  getItensLocal(local: Local) {
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.itens) {

        let numPrimeiraLinha: number = Number(event.first)
        let numLinhasPagina: number = (numPrimeiraLinha + Number(event.rows))
        this.itens = [...this.itensLazyLoad.slice(numPrimeiraLinha, numLinhasPagina)];

        this.loading = false;
      }
    }, 1000);
  }
  lectionChange(value = []) {
    this.itens = [...value];
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente DELETAR esse Patrimônio?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Você confirmou a operação!' });
        this.inventarioService.getDelete(id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Deletado', detail: 'Patrimônio deletado com sucesso!' });
            setTimeout(() => {
              return window.location.reload();
            }, 1000)
          }, (erro) => {
            if (erro.status == 404) {
              this.messageService.add({ severity: 'error', summary: 'Erro 404', detail: 'Página não encontrada.' });
            } else if (erro.status == 500) {
              this.messageService.add({ severity: 'error', summary: 'Erro 500', detail: 'Houve um erro ao carregar ao informações.' });
            }
            else if (erro != null) {
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

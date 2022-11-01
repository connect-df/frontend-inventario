import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
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

  // inventario: Inventario[] = [];
  item = new Inventario
  itens = new Array<Inventario>()
  itensLazyLoad = new Array<Inventario>()

  loading: boolean = false
  totaldeRegistros: number = 0

  constructor(
    private inventarioService: InventarioService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,

    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    const local: Local = this.route.snapshot.params['local'];

    this.loading = true;
    // if (local) {
    // this.getItensLocal(local)
    // console.log(local)
    // } else {
    this.getItens(local)
    // }
  }

  getItens(local: Local) {
    this.inventarioService.listar().subscribe(
      (response) => {
        if (local != null) {
          this.title = "Itens de " + local;
        } else {
          this.itens = [...response]
          this.itensLazyLoad = [...response]
          this.totaldeRegistros = response.length
        }
      }
    )
  }


  // getItensLocal(local: Local) { 
  // }

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
      message: 'Deseja realmente DELETAR esse Item?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Você confirmou a operação!' });
        this.inventarioService.getDelete(id).subscribe();
        return window.location.reload();
      },
    })
  }

}

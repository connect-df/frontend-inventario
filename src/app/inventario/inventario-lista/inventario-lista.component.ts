import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Inventario } from '../inventario';
import { InventarioService } from '../inventario.service';

@Component({
  selector: 'app-inventario-lista',
  templateUrl: './inventario-lista.component.html',
  styleUrls: ['./inventario-lista.component.css']
})
export class InventarioListaComponent implements OnInit {
  title: string = 'Itens'
  item: Inventario = new Inventario
  itens: Inventario[] = new Array<Inventario>()
  itensLazyLoad: Inventario[] = new Array<Inventario>()


  loading: boolean = false
  totaldeRegistros: number = 0

  constructor(
    private inventarioService: InventarioService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,

    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    const local: string = this.route.snapshot.params['local'];

    this.loading = true;
    this.getItens()
  }

  getItens() {
    this.inventarioService.listar().subscribe(
      (response) => {
        this.itens = [...response]
        this.itensLazyLoad = [...response]
        this.totaldeRegistros = response.length
      }

    )
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

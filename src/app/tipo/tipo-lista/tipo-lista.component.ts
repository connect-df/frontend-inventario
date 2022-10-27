import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
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
      message: 'Deseja realmente DELETAR esse Tipo de Item?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Você confirmou a operação!' });
        this.tipoService.getDelete(id).subscribe();
        return window.location.reload();
      },
    })
  }


}

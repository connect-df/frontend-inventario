import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
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
    private localService: LocalService ,

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
      message: 'Deseja realmente DELETAR esse projeto?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Você confirmou a operação!' });
        this.localService.getDelete(id).subscribe();
        return window.location.reload();
      },
    })
  }

}
